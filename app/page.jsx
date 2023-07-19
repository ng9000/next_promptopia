import Feed from "@/components/feed/Feed";
import Sidebar from "@/components/nav-sidebar/sidebar";
import NewsFeed from "@/components/news-right-sidebar/NewsFeed";

const Home = () => {
  return (
    <section className="layout prevent-select">
      {/* <h1 className="head_text text-center">
        {/* Discover and share
       <br className="max-md:hidden" /> 
        <span className="orange_gradient">Twitter</span>
      </h1> */}
      <Sidebar />
      <Feed />
      <NewsFeed />
    </section>
  );
};

export default Home;
