/* 
Is a child of /pages/index.tsx
url: /
description: Main content of HomePage
Layout:
  Nav
  hero
  <THIS>?<Main>
  footer

TODO: 
  Make container components.
  Make card component contents more reuseable from within card/v1/index by passing a type prop of values: ["popularDestination", "FallBackLink", etc].
*/

import { useEffect } from "react";
import Link from "next/link";

import Card  from "@/components/ui/card";
import CardFallBackLink from "@/components/ui/card/v1/accessories/CardFallBackLink";
import PopularDestinationCard from "@/components/ui/card/v1/accessories/PopularDestinationCard";

function Main() {

  // API dummy data START:

  // This is simply just for testing. API should just be returned from a helper file like "helpers/API/v1/<fileName>", then assigned to a state.
  const apiDummy = {
    result: {
      fallBackLinks: [
        {
          href: "/hotels",
          btmTitle: "Hotels",
          logo: "data:image/png;base64,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",
        },
        {
          href: "/car-hire-in",
          btmTitle: "Car hire",
          logo: "data:image/png;base64,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",
        },
        {
          href: "/explore-everywhere",
          btmTitle: "Explore everywhere",
          logo: "data:image/png;base64,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",
        },
      ],
      popularDestinations:{
        title: "Popular right now",
        description: "Other travelers are loving these destinations. Search flights, hotels, and car rentals and join them on the adventure.",
        subLinks: ["Flights", "Hotels", "Car Rentals"],
        items: [
          {
            location: "Las Vegas",
            logo: 'https://content.skyscnr.com/00576d2aa3f6283d67e85fa7f26be1ee/las-vegas.jpg?crop=100px:100px&quality=90',
          },
          {
            location: "Miami International",
            logo: 'https://content.skyscnr.com/e8876138a899f8e239785a906becdeb0/GettyImages-505892311.jpg?crop=100px:100px&quality=90',
          },
          {
            location: "New York",
            logo: 'https://content.skyscnr.com/b62fd4346123d1eb9f7525c8f72f2a8a/stock-photo-new-york-city-at-twilight-128894587.jpg?crop=100px:100px&quality=90',

          },
          {
            location: "Los Angeles",
            logo: 'https://content.skyscnr.com/m/578071f64c11af10/original/ST3-100-CALI-Q222-Destination-Spotlight-LA.png?crop=100px:100px&quality=90',

          },
          {
            location: "Chicago",
            logo: 'https://content.skyscnr.com/m/578071f64c11af10/original/ST3-100-CALI-Q222-Destination-Spotlight-LA.png?crop=100px:100px&quality=90',

          },
          {
            location: "Denver",
            logo: 'https://content.skyscnr.com/m/578071f64c11af10/original/ST3-100-CALI-Q222-Destination-Spotlight-LA.png?crop=100px:100px&quality=90',

          },
        ]
      }
    }
  }

  // API dummy data END:

  useEffect(() => {
    return () => {
    }
  }, [])
  

  return (
    <main className=" flex flex-col  mx-auto py-4 h-full w-full max-w-7xl px-3 lg:mt-5 md:mt-4 sm:mt-0">
        <section className="CardLinkFallBacksContainer flex flex-row justify-center mx-auto py-4 h-full w-full">

          {apiDummy.result.fallBackLinks.map((item, index) => {
            return(
              <Card cardStyle="w-full mr-4 pl-3 mx-1 py-3 border-2 rounded-xl last:mr-0">
                <CardFallBackLink href_link={item.href} bottomText={item.btmTitle} tinyImage={item.logo}></CardFallBackLink>
              </Card>
            )
          })}

        </section>

        {/* Get GraphicPromo data from API to randomnize which one is returned. And make this a comp. */}
        <section className="GraphicPromo flex flex-row justify-center mx-auto py-4 h-full w-full lg:mt-8 md:mt-7 sm:mt-0 relative">
          {/* IMG brightness needs to be changed to 60%, or else it's just too dark. Tailwind won't let me, and inline would be better for it */}
          <img className="rounded-xl w-full h-full min-h-[365px] object-cover brightness-50" src="https://content.skyscnr.com/m/6a5b5ada966ccdac/original/Easter-Travel-Graphic-Promo-Desktop-2096x800.jpg?imbypass=true"></img>
          <span className="absolute text-white bottom-[16%] left-[35px] font-bold pr-[20px]" style={{fontSize: "1.6em"}}>On the hunt for Easter escapes  

              {/* Needs changed to Tailwind. Inline was just for testing */}
              <p style={{fontSize: "0.6em", fontWeight: "600", marginTop: "10px"}}>From rustic retreats to city staycations, make the most of your Easter break with these top getaways.</p>
              <button style={{fontWeight: "600", fontSize: "0.7em", backgroundColor: "white", borderRadius: "7px", color: "black", padding: "3px 10px", marginTop: "40px"}}>See Tips</button>
          </span>
         
        
        </section>

        <section className="PopularDestinations flex flex-col w-full mt-10">
            <div className="PopularDestinationHeader">
              <span className="font-bold text-2xl">{apiDummy.result.popularDestinations.title}</span>
              <p className="mt-1">{apiDummy.result.popularDestinations.description}.</p>
            </div>

            <div className="PopularDestinationCardsContainer flex flex-row flex-wrap w-full justify-start items-start gap-x-1 mt-4">
              {apiDummy.result.popularDestinations.items.map((item, index) => {
                return (
                  <Card cardStyle="border-2 rounded-xl w-full 2xl:w-[412px] xl:w-[33%] lg:w-[33%] md:w-[49%] sm:w-[100%]">
                    {/* ah tsx, why */}
                    <PopularDestinationCard data={{subLinks: apiDummy.result.popularDestinations.subLinks, logo: item.logo, location: item.location }}></PopularDestinationCard>
                  </Card>
                )
              })}
            </div>
        </section>
    </main>
  );
}
export default Main;
 
