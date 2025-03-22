import React, { useState, useEffect } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Habit } from '../types';
import { TAGS } from './HabitForm';
import ConfirmationModal from './ConfirmationModal';

interface HabitGridProps {
  habits: Habit[];
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  onMarkCompleted: (habit: Habit) => void;
}

const HabitGrid: React.FC<HabitGridProps> = ({ habits, onEdit, onDelete, onMarkCompleted }) => {
  const [showModal, setShowModal] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderTags = (tags: string[]): JSX.Element[] =>
    tags.map((tag) => {
      const tagInfo = TAGS.find((t) => t.text.toLowerCase() === tag.toLowerCase());
      return (
        <span
          key={tag}
          style={{
            backgroundColor: tagInfo?.color || '#007acc',
            color: '#fff',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            marginRight: '0.3rem',
            display: 'inline-block',
            fontSize: '0.9rem',
          }}
        >
          {tag}
        </span>
      );
    });

  const handleDeleteClick = (habit: Habit) => {
    setHabitToDelete(habit);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (habitToDelete) {
      onDelete(habitToDelete);
    }
    setShowModal(false);
    setHabitToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setHabitToDelete(null);
  };

  // Set up an interval to check for date changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date().toISOString().split('T')[0];
      if (newDate !== currentDate) {
        setCurrentDate(newDate);
      }
    }, 60000); // Check every minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentDate]);

  return (
    <>
      <Grid data={habits}>
        <Column
          field="name"
          title="Habit"
          cell={(props) => {
            const isCompletedToday = props.dataItem.completedDate === currentDate;
            return (
              <td style={{ color: isCompletedToday ? 'green' : 'inherit' }}>
                {capitalizeFirstLetter(props.dataItem.name)}
              </td>
            );
          }}
        />
        <Column field="estimatedTime" title="Estimated Time (in mins)" />
        <Column
          field="tags"
          title="Tags"
          cell={(props) => <td>{renderTags(props.dataItem.tags)}</td>}
        />
        <Column field="streak" title="Streak" />
        <Column
          title="Actions"
          cell={(props) => {
            const habit = props.dataItem;
            const isCompletedToday = habit.completedDate === currentDate;
            return (
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="k-button k-primary" onClick={() => onEdit(habit)}>
                    Edit
                  </button>
                  <button className="k-button k-danger" onClick={() => handleDeleteClick(habit)}>
                    Delete
                  </button>
                  <button
                    className="k-button"
                    onClick={() => onMarkCompleted(habit)}
                    disabled={isCompletedToday}
                  >
                    Mark Completed
                  </button>
                </div>
              </td>
            );
          }}
        />
      </Grid>

      {showModal && habitToDelete && (
        <ConfirmationModal
          message={`Are you sure you want to delete the habit "${habitToDelete.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default HabitGrid;

