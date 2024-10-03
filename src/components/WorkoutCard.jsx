const WorkoutCard = ({ workout }) => {
    const { name, description, exercises } = workout;
  
    return (
      <div style={styles.card}>
        <h2 style={styles.title}>{name}</h2>
        <p style={styles.description}>{description}</p>
        <h3 style={styles.exercisesTitle}>Exercises:</h3>
        <ul style={styles.exercisesList}>
          {exercises.map((exercise, index) => (
            <li key={index} style={styles.exerciseItem}>
              {exercise.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const styles = {
    card: {
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      margin: "16px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      maxWidth: "400px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    description: {
      fontSize: "16px",
      marginBottom: "16px",
    },
    exercisesTitle: {
      fontSize: "20px",
      marginBottom: "8px",
    },
    exercisesList: {
      listStyleType: "none",
      paddingLeft: "0",
    },
    exerciseItem: {
      fontSize: "16px",
      padding: "4px 0",
    },
  };
  
  export default WorkoutCard;