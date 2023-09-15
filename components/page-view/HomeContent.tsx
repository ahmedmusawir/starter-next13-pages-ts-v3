import { Container, Hero, Row } from "../ui-ux";
import FeaturedCities from "../ui-ux/FeaturedCities";
import FeaturedCuisines from "../ui-ux/FeaturedCuisines";
import FeaturedRestaurants from "../ui-ux/FeaturedRestaurants";

interface Props {
  // homePageContent: HomePageData;
}

// const HomeContent = ({ homePageContent }: Props) => {
const HomeContent = () => {
  // const title = homePageContent?.attributes?.heroTitle;
  // const slogan = homePageContent?.attributes?.heroSlogan;

  return (
    <Container FULL className="">
      {/* <Hero title={title} slogan={slogan} /> */}
      <Hero />
      <Row>
        <FeaturedRestaurants />
      </Row>
      <Row>
        <FeaturedCuisines />
      </Row>
      <Row>
        <FeaturedCities />
      </Row>
    </Container>
  );
};

export default HomeContent;
