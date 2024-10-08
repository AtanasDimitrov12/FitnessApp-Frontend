import backEndClient from './axiosClient';

const workoutsURL = "workouts";

export const getTodos = async () => {
    let response = await backEndClient.get(workoutsURL);
    if (response)
    {   
        return response.data.workouts;
    }

    alert ("Something went wrong");
    return "";
}

export const createNewWorkout = (input) => {
    return backEndClient.post(workoutsURL, {
            name: input.name,
            description: input.description,
            pictureURL: input.pictureURL,
            exercises: inpuy.exercises,
        }).then(response => {
            return response.data;
        });
}