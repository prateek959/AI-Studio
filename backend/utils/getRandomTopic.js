import { topics } from "../config/topics.js";

export const getRandomTopic = () => {

  const index = Math.floor(Math.random() * topics.length);

  return topics[index];

};