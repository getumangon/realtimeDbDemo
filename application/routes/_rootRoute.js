import { createStackNavigator, createAppContainer } from "react-navigation";
import ToDoContainer from '../components/ToDoListContainer'
import ToDoEdit from "../components/ToDoEdit";

const _rootRoute = createStackNavigator({
    ToDoContainer: {
      screen: ToDoContainer,
      navigationOptions: {
        title: 'To Do application'
      }
    },
    ToDoEdit: {
        screen: ToDoEdit
      }
  },
  {
    initialRouteName: "ToDoContainer"
  }
  );
  
  export default createAppContainer(_rootRoute);