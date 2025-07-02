import {Admin, Resource} from "react-admin";
import {Layout} from "./Layout.jsx";
import {dataProvider} from "./dataProvider.js";
import PostList from "./pages/posts/PostList/PostList.jsx";
import PostEdit from "./pages/posts/PostEdit/PostEdit.jsx";
import PostShow from "./pages/posts/PostShow/PostShow.jsx";
import UserList from "./pages/users/UserList/UserList.jsx";
import UserShow from "./pages/users/UserShow/UserShow.jsx";
import PostCreate from "./pages/posts/PostCreate/PostCreate.jsx";
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import HomePage from "./pages/home/HomePage/HomePage.jsx";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    dashboard={HomePage}
  >
    <Resource
      icon={ArticleIcon}
      name="posts"
      list={PostList}
      show={PostShow}
      edit={PostEdit}
      create={PostCreate}
    />
    <Resource
      icon={PersonIcon}
      name="users"
      list={UserList}
      show={UserShow}
    />
  </Admin>
);
