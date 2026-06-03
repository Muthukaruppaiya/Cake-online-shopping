import Hero from '../components/Hero';
import CategoryStrip from '../components/CategoryStrip';
import ProductSection from '../components/ProductSection';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import { useShop } from '../context/ShopContext';

const Home = () => {
  const { cakes } = useShop();

  const activeCakes = cakes.filter((c) => c.isActive !== false);

  const bySection = (section) => activeCakes.filter((c) => c.section === section);

  return (
    <div className="animate-luxury">
      {/* Landing — hero & categories only above the fold */}
      <Hero />
      <CategoryStrip />

      {/* Product catalog — shown after landing, CakeSquare-style sections */}
      <div id="cakes" className="bg-[#FFF8F4]">
        <ProductSection
          id="birthday-cakes"
          title="Best Birthday Cake Designs in Theni"
          cakes={bySection('birthday')}
          seeAllLink="/shop?category=birthday"
        />
        <ProductSection
          id="first-birthday"
          title="First Birthday Designer Cakes"
          cakes={bySection('first-birthday')}
          seeAllLink="/shop?category=first-birthday"
        />
        <ProductSection
          id="kids-cakes"
          title="Kids Birthday Designer Cakes"
          cakes={bySection('kids')}
          seeAllLink="/shop?category=kids"
        />
        <ProductSection
          id="wedding-cakes"
          title="Custom Wedding Designer Cakes"
          cakes={bySection('wedding')}
          seeAllLink="/shop?category=wedding"
        />
      </div>

      <WhyChooseUs />
      <FAQ />
    </div>
  );
};

export default Home;
