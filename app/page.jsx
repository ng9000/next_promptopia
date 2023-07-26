import Feed from "@/components/feed/Feed";
import Sidebar from "@/components/nav-sidebar/sidebar";
import NewsFeed from "@/components/news-right-sidebar/NewsFeed";

const Home = () => {
  return (
    <section className="layout prevent-select">
      <Sidebar active="home" />
      <Feed />
      <NewsFeed />
    </section>
  );
};

export default Home;
