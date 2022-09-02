import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";

import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  function addTask(enteredText) {
    setTasks((tasks) => [
      ...tasks,
      { text: enteredText, id: Math.random().toString() },
    ]);
  }

  function deleteTask(id) {
    setTasks((tasks) => {
      return tasks.filter((task) => task.id !== id);
    });
  }

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <TaskInput
          onAddTask={addTask}
          visible={isModalVisible}
          hideModal={hideModal}
        />
        <View style={styles.body}>
          <View style={{ flex: 10 }}>
            <FlatList
              data={tasks}
              renderItem={(itemData) => {
                return (
                  <TaskItem
                    text={itemData.item.text}
                    id={itemData.item.id}
                    onDeleteTask={deleteTask}
                  />
                );
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button onPress={showModal} title="Add a new task" />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#311b6b"
  },
  body: {
    flex: 1,
    paddingTop: 20,
  },
});
