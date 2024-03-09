import { Container, Grid, Sheet, Stack } from "@mui/joy";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import styles from "./app.module.css";
import ListHistory from "./app/home/pages/ListHistory";
import MostPlayedPage from "./app/home/pages/MostPlayed";
import Feed from "./app/home/pages/Feed";
import Navbar from "./shared/components/Navbar";
import UserConfigPage from "./app/home/pages/UserConfigPage";
import UserPlaylists from "./app/home/pages/UserPlaylists";
import PlayBar from "./shared/components/PlayBar";
import SongModel from "./app/home/models/SongModel";
import PlaylistSongsPage from "./app/home/pages/PlaylistSongsPage";
import Search from "./app/home/pages/Search";
import { HotPage } from "./app/home/pages/HotPage";

const AppWrapper = () => {
  // Replace this with the song you want to show playing.
  const fakeSong = new SongModel({
    artist: "The Beatles",
    title: "Hey Jude",
    duration: 300,
    genre: "Rock",
    id: "1",
    times_ever_played: 32,
  });

  return (
    <Container maxWidth={"xl"} sx={{ height: "100vh", padding: 8 }}>
      <Grid
        container
        direction={"column"}
        sx={{ height: "100%", flexGrow: 1, flexWrap: "nowrap" }}
      >
        <Grid
          container
          direction="row"
          sx={{
            height: "80%",
            borderRadius: 16,
            boxShadow: "rgb(144 4 188 / 60%) 0px 0px 0px 12px",
            flexGrow: 10,
          }}
          className={styles.containers}
        >
          <Grid xs="auto" sx={{ height: "100%", p: 1, flexWrap: "nowrap" }}>
            <Sheet
              sx={{
                height: "100%",
                background: "#780e6fb8",
                borderRadius: 16,
                py: 4,
                px: 2,
                border: "2px solid #9e0591",
                overflowY: "auto",
              }}
            >
              <Navbar />
            </Sheet>
          </Grid>
          <Grid
            xs
            sx={{ height: "100%", overflowY: "auto", background: "#ffffff00" }}
          >
            <Outlet />
          </Grid>
        </Grid>
        <Grid
          sx={{
            my: 5,
            borderRadius: 16,
            boxShadow: "rgb(144 4 188 / 60%) 0px 0px 0px 12px",
          }}
        >
          <PlayBar song={fakeSong} progress={80} />
        </Grid>
      </Grid>
    </Container>
  );
};

/**
 * Creates a browser router and defines the routes for the application.
 * @param {Array} routes - An array of route objects containing the path and component.
 * @returns {Object} - The router object.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      {
        path: "/",
        Component: Feed,
      },
      {
        path: "/MyPlaylists",
        Component: UserPlaylists,
      },
      {
        path: "/history",
        Component: ListHistory,
      },
      {
        path: "/most-played",
        Component: MostPlayedPage,
      },
      {
        path: "/my-profile",
        Component: UserConfigPage,
      },
      {
        path: "/playlist",
        Component: PlaylistSongsPage,
      },
      {
        path: "/feed",
        Component: Feed,
      },
      {
        path: "/search",
        Component: Search,
      },
      {
        path: "/hot",
        Component: HotPage,
      },
    ],
  },
]);

/**
 * The root component of the application.
 * @returns {JSX.Element} - The rendered application.
 */
export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
