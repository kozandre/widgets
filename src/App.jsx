import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { PostList } from "./pages/posts/PostList";
import { PostEdit } from "./pages/posts/PostEdit";
import { PostShow } from "./pages/posts/PostShow";
import UserList from "./pages/users/UserList/UserList";
import UserShow from "./pages/users/UserShow/UserShow";
import { PostCreate } from "./pages/posts/PostCreate";
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import HomePage from "./pages/home/HomePage/HomePage";

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
