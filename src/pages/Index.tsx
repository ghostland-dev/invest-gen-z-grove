
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import FeaturedArticles from '../components/FeaturedArticles';
import RecentPosts from '../components/RecentPosts';
import Newsletter from '../components/Newsletter';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CategorySection />
      <FeaturedArticles />
      <RecentPosts />
      <Newsletter />
    </Layout>
  );
};

export default Index;
