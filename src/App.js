import Footer from "./Components/Footer";
import Library from "./Components/Library";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";
import Song from "./Components/Song";
import Context from "./Provider/Context";
import Layout from "./Provider/Layout";

function App() {
  return (
    <Context>
      <Library />
      <Layout>
        <Navbar />
        <Song />
        <Player />
        <Footer />
      </Layout>
    </Context>
  );
}

export default App;
