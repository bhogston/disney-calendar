import { useState, useEffect, useRef } from "react";

const DAYS = [
  {
    date: "Mar 15", day: "Sun", label: "Day 1", emoji: "🚗",
    location: "Travel + Disney Springs",
    accent: "#F5C842",
    notes: "7-hour drive from VA. Disney Springs, Pin HQ, Character Warehouse. Check in to Pop Century.",
    schedule: [],
    ideas: [
      { title: "Guess Who's Back? / First Day Arrival", platforms: ["TikTok","IG Reel","IG Story"], timing: "Arrival", shots: ["Welcome to Walt Disney World road sign","Family stepping out of car — reaction shot","Pop Century entrance sign","Kid's first look at the resort","Room reveal"] },
      { title: "Pop Century Overview + Vibes", platforms: ["TikTok","IG Reel"], timing: "After check-in / golden hour", shots: ["Giant pop culture sculptures","Pool area overview","Skyliner gondola overhead","Reflection in Hourglass Lake","Resort at golden hour"] },
      { title: "Pop Century — What to Expect", platforms: ["TikTok","IG Reel","IG Carousel"], timing: "Anytime at resort", shots: ["Era-by-era exterior walk","Room tour","Food court walkthrough","Refillable mug station","Skyliner station"] },
      { title: "Disney Springs — Pin Trading Haul", platforms: ["TikTok","IG Carousel"], timing: "Disney Springs", shots: ["Pin HQ exterior","Wall of pins inside","Close-ups of interesting finds","Character Warehouse storefront","Pin trade with cast member","Flat lay haul"] },
      { title: "Disney Springs Snacks", platforms: ["TikTok","IG Reel"], timing: "Disney Springs", shots: ["S'more — being toasted, beauty shot, first bite","Millionaire's shortbread — layers cross-section, first bite","Affogato — espresso pour, steam close-up, first sip"], note: "Three snacks, one video or one each." },
      { title: "Park Bag Video + Man Edition", platforms: ["TikTok","IG Reel"], timing: "Before Day 2 packing", shots: ["Flat lay of everything — both bags separately","Each item held to camera","Camera gear featured prominently","Final packed bag ready"] },
      { title: "Hey Dad — 20-Year-Old Camera", platforms: ["TikTok","IG Reel"], timing: "Evening — room content", shots: ["Old camera revealed","Old photos or footage from it","Reaction shot","Cut to current trip footage"] },
      { title: "Disney Room with Pizza", platforms: ["TikTok","IG Reel"], timing: "First night", shots: ["Pizza box open on hotel bed","TV on in background","Kid in pajamas","Full cozy room vibe"] },
      { title: "DJI Aerial — Pop Century + Springs", platforms: ["TikTok","IG Reel"], timing: "Late afternoon", shots: ["Aerial of Pop Century resort","Skyliner from above","Disney Springs overview","Sunset aerial if timing works"], note: "Verify Disney drone policy before flying." },
      { title: "7 Days / Zero Problems (Collect All Trip)", platforms: ["TikTok","IG Reel"], timing: "Collect throughout trip", shots: ["Car loaded — trip start","Arriving at Disney","First pin trade","First Disney snack","Kid's first reaction moments"], note: "Big trip hype edits. Collect B-roll all 6 days, assemble at the end." },
      { title: "Daily Recap — Day 1", platforms: ["TikTok","IG Reel","IG Carousel"], timing: "End of night", shots: ["Best 5–8 clips","Arrival highlight","Springs snacks","Pin haul reveal","Room at night"] },
    ]
  },
  {
    date: "Mar 16", day: "Mon", label: "Day 2", emoji: "🎬",
    location: "Hollywood Studios",
    accent: "#5B9BD5",
    notes: "Rope drop Mickey's Railway or Rise of the Resistance. Skyliner in. Galaxy's Edge, Tower of Terror, Toy Story Land, Slinky Dog Dash. Note: Rock 'n' Roller Coaster is CLOSED — just closed March 2 for Muppets retheme (opens Summer 2026). MuppetVision also permanently closed.",
    schedule: [
      { time: "Rope Drop", label: "Mickey & Minnie's Runaway Railway OR Rise of the Resistance", type: "rope", note: "No height req for Railway — whole family. Rise of the Resistance (40″ req) is the other top rope drop option. Choose based on which line hits first. Both are at opposite ends of the park." },
      { time: "Mid-Morning", label: "Star Wars: Rise of the Resistance ⚡ LL", type: "ll", note: "40″ req — Atlas is right at the line. The most epic ride in Hollywood Studios. Multi-system experience: you get 'captured' by the First Order. Budget 45-60 min for queue + ride." },
      { time: "Mid-Morning", label: "Millennium Falcon: Smugglers Run ⚡ LL", type: "ll", note: "No height req — whole family. Galaxy's Edge. You pilot the Millennium Falcon — everyone gets a role (pilot, gunner, engineer). Pilots have the most fun." },
      { time: "Mid-Day", label: "Star Tours — The Adventures Continue", type: "ll", note: "40″ req — Atlas is right at the line. Motion simulator with randomized Star Wars scenes — different every time. Usually manageable wait mid-day." },
      { time: "11:40 – 12:40 PM", label: "Tower of Terror ⚡ LL", type: "ll", note: "40″ req — Atlas is right at the line. Sunset Blvd. Great reaction shot opportunity. Ride departs from the 13th floor." },
      { time: "4:25 – 5:25 PM", label: "Toy Story Mania ⚡ LL", type: "ll", note: "No height req — whole family. Toy Story Land. Interactive 4D shooting game. Compete for score." },
      { time: "4:25 – 5:25 PM", label: "Alien Swirling Saucers", type: "ll", note: "32″ req — Atlas is fine. Toy Story Land, right next to Toy Story Mania. Fun spinner — short line, easy to stack with the LL." },
      { time: "6:55 – 7:55 PM", label: "Slinky Dog Dash ⚡ LL", type: "ll", note: "38″ req — Atlas is fine at 40″. Outdoor coaster in Toy Story Land. Film the reaction." },
      { time: "Note", label: "🚫 Rock 'n' Roller Coaster — CLOSED", type: "swap", note: "Permanently closed March 2, 2026 for Muppets retheme. Opens Summer 2026. Not available during your trip." },
    ],
    ideas: [
      { title: "Coffee at the Skyliner — HS Morning", platforms: ["TikTok","IG Reel"], timing: "Skyliner ride in", shots: ["Coffee in hand inside gondola","Looking out window — morning light","Hollywood Studios coming into view","Stepping off at HS station"] },
      { title: "Hollywood Studios Mickey Globe", platforms: ["TikTok","IG Reel"], timing: "Rope drop — before you go in", shots: ["Wide shot of globe at entrance","Close-up of globe texture","Rope drop crowd behind, globe in front","Kid reaching toward the globe"] },
      { title: "Mickey & Minnie's Runaway Railway", platforms: ["TikTok","IG Reel"], timing: "Rope drop", shots: ["Chinese Theatre exterior","Queue theming — movie poster details","Family boarding","Kid's face during the ride","Coming off — verdict reaction"], note: "No height req, everyone rides. Trackless — lots of fast scene changes. Atlas might be surprised." },
      { title: "Hollywood Studios B-Roll", platforms: ["TikTok","IG Reel"], timing: "Throughout the day", shots: ["Sunset Boulevard wide — Tower looming at the end","Chinese Theatre straight-on","Echo Lake reflections","Commissary Lane at golden hour","Signage and prop details park-wide"], note: "Build a B-roll bank here. You'll pull from this for months." },
      { title: "Galaxy's Edge — For the First Time", platforms: ["TikTok","IG Reel"], timing: "Mid-morning", shots: ["First reveal walking into Black Spire Outpost","Millennium Falcon — multiple angles","Kid's face seeing the Falcon","Market stalls and alien props","Looking up at rock formations overhead","Blue or green milk close-up","Rise of the Resistance entry"], note: "Get a full B-roll bank here. Use for multiple future pieces." },
      { title: "Ronto Wrap", platforms: ["TikTok","IG Reel"], timing: "Galaxy's Edge", shots: ["Ronto Roasters exterior with pod racer rotisserie","Meat spinning on the spit","Wrap being assembled","Beauty shot in hand","First bite reaction"] },
      { title: "Tower of Terror Reaction", platforms: ["TikTok","IG Reel"], timing: "LL: 11:40 – 12:40 PM", shots: ["Sunset Boulevard walk-up","Hotel exterior details","Queue theming — bellhop lobby","Family boarding the elevator","Coming off — reaction shot","Kid's verdict to camera"], note: "40″ req — Atlas should be fine. Great reaction video." },
      { title: "Indiana Jones Cold Brew", platforms: ["TikTok","IG Reel","IG Story"], timing: "Echo Lake area", shots: ["Jock Lindsey's Hangar Bar exterior","Cold brew beauty shot — overhead + side","Cup and branding close-up","First sip reaction","Bar interior atmosphere"] },
      { title: "Baseline Taphouse", platforms: ["TikTok","IG Reel"], timing: "Grand Avenue — afternoon", shots: ["Exterior / entrance","Beer or wine being poured","Drink close-up — condensation, color","Echo Lake view from seating"] },
      { title: "Need to Watch a Squid Play Trumpet", platforms: ["TikTok","IG Reel"], timing: "Galaxy's Edge — Oga's Cantina", shots: ["Cantina exterior","DJ R3X performing — multiple angles","Wide cantina crowd shot","Crowd reacting","Drinks in foreground, DJ in background"] },
      { title: "Toy Story Mania + Slinky Dog Reactions", platforms: ["TikTok","IG Reel"], timing: "LL: 4:25 PM + 6:55 PM", shots: ["Toy Story Land wide — oversized toy aesthetic","Slinky Dog Dash exterior","Kid's face before getting on","Reaction getting off","Atlas and Sean riding Toy Story Mania together"], note: "Both in Toy Story Land — same area, easy to film both in one stretch." },
      { title: "Daily Recap — Day 2", platforms: ["TikTok","IG Reel","IG Carousel"], timing: "End of night", shots: ["Best 5–8 clips","Ronto Wrap + cold brew highlight","Galaxy's Edge hero moment","Kid's best reaction","Leaving the park at night"] },
    ]
  },
  {
    date: "Mar 17", day: "Tue", label: "Day 3", emoji: "🏰",
    location: "Magic Kingdom",
    accent: "#E8865A",
    notes: "St. Patrick's Day! Rope drop Peter Pan + Small World or Pooh. Beak and Barrel dining at 6:05 PM in Adventureland. Note: Big Thunder Mountain CLOSED (reopening Spring 2026 — may or may not be open by Mar 17, check closer to trip). Buzz Lightyear CLOSED until Spring 2026. Liberty Square Riverboat permanently closed (Cars expansion).",
    schedule: [
      { time: "Rope Drop", label: "Peter Pan + Small World or Pooh", type: "rope", note: "All no height req — whole family. All in Fantasyland, close together. One rope drop run through all three." },
      { time: "9:05 – 10:05 AM", label: "PhilharMagic ⚡ LL", type: "ll", note: "No height req. Fantasyland, next to Peter Pan. 4D show, great for Atlas." },
      { time: "Morning", label: "Space Mountain ⚡ LL — RIDER SWAP 🔄", type: "swap", note: "44″ req — Atlas can't ride. Rider swap needed. Classic MK coaster in the dark. Go in the morning before heat builds — it's outdoors queue." },
      { time: "Morning", label: "Jungle Cruise", type: "ll", note: "No height req — whole family. Adventureland. Corny skipper jokes, animatronic animals. Surprisingly long ride. Good for a mid-morning slot." },
      { time: "Morning", label: "Under the Sea — Journey of the Little Mermaid", type: "ll", note: "No height req — whole family. Fantasyland. Slow dark ride through Ariel's story. Atlas will know it." },
      { time: "1:40 – 2:40 PM", label: "Seven Dwarfs Mine Train ⚡ LL", type: "ll", note: "38″ req — Atlas is fine. Great family coaster. Atlas's reaction will be the best content of the day." },
      { time: "2:40 – 3:40 PM", label: "Haunted Mansion ⚡ LL", type: "ll", note: "No height req — whole family. Liberty Square. Back-to-back with Mine Train is efficient." },
      { time: "Afternoon", label: "Tomorrowland Speedway", type: "ll", note: "54″ to drive solo — Atlas can RIDE with an adult though (no min height as passenger). Fun for kids. Gas-powered cars on a track. Atlas will want to 'drive.' Plan for it." },
      { time: "Afternoon", label: "Carousel of Progress", type: "ll", note: "No height req. Tomorrowland. Rotating theater through American history + innovation. Air conditioned. Good mid-day break. Note: May close for refurbishment sometime in 2026." },
      { time: "5:10 – 6:10 PM", label: "Tiana's Bayou Adventure ⚡ LL", type: "ll", note: "40″ req — Atlas is right at the line. Frontierland. You WILL get wet — plan camera protection." },
      { time: "6:05 PM", label: "The Beak and Barrel 🍽 Dining", type: "dining", note: "Magic Kingdom, Adventureland — next to Pirates of the Caribbean. Pirate bar, 45-min session, max 2 drinks per adult. Note: Tiana's LL overlaps — ride at 5:10 start to be done in time for 6:05." },
      { time: "Note", label: "🚫 Big Thunder Mountain — LIKELY CLOSED", type: "swap", note: "Closed since Jan 2025 for major refurbishment. Reopening 'Spring 2026' — may open by your trip, may not. Check closer to travel. New track + Rainbow Caverns scene incoming." },
      { time: "Note", label: "🚫 Buzz Lightyear Space Ranger Spin — CLOSED", type: "swap", note: "Closed Aug 2025 for enhancements. Reopening Spring 2026 — may or may not be open by Mar 17. New ride vehicles, new scene, new blasters." },
    ],
    ideas: [
      { title: "Magic Kingdom Breakfast Items", platforms: ["TikTok","IG Reel"], timing: "First thing — Main Street Bakery", shots: ["Main Street Bakery exterior","Pastry case close-up","Coffee + pastry on a Main Street table","First bite / first sip","Main Street in the background"] },
      { title: "Rope Drop — Fantasyland Run", platforms: ["TikTok","IG Reel"], timing: "Rope drop", shots: ["Peter Pan queue theming","Family boarding Peter Pan","Small World exterior — iconic facade","Loading boats for Small World","Pooh queue theming if doing that"] },
      { title: "This Moment Forever — Main Street", platforms: ["TikTok","IG Reel"], timing: "Arrival / golden hour", shots: ["Centered Main Street with castle at the end","Family walking toward castle — from behind","Kid pointing at castle","Slow push-in on the castle"] },
      { title: "Main Street Golden Hour", platforms: ["TikTok","IG Reel"], timing: "Stay through sunset", shots: ["Warm light on Victorian storefronts","Castle glowing in golden light","Silhouette of family walking toward castle","Horse-drawn trolley in warm light","Detail shots — lamp posts, flower boxes"], note: "Plan to be on Main Street at sunset. This is a priority shot." },
      { title: "Adventureland Aesthetic", platforms: ["TikTok","IG Reel"], timing: "Afternoon", shots: ["Adventureland bridge crossing","Tiki Room exterior","Jungle Cruise dock","Pirates of the Caribbean queue at night","Overhead foliage + lantern details","Dole Whip stand"] },
      { title: "Barnstormer Reaction (Funny)", platforms: ["TikTok","IG Reel"], timing: "Fantasyland", shots: ["Kid's face before — excited or nervous","Boarding the coaster","Kid getting off — verdict","Parent reaction to the 'smallest coaster' being wild"], note: "35″ req — Atlas is fine. Lean into the comedy." },
      { title: "Seven Dwarfs Mine Train Reaction", platforms: ["TikTok","IG Reel"], timing: "LL: 1:40 – 2:40 PM", shots: ["Mine Train exterior","Queue walk — mine shaft theming","Family boarding mine cars","Atlas's face before","Reaction coming off","Mine car swinging on curves if you can catch it"] },
      { title: "Haunted Mansion + Memento Mori Wall", platforms: ["TikTok","IG Reel"], timing: "LL: 2:40 – 3:40 PM", shots: ["Mansion exterior at dusk","Memento Mori shop","The specific wall painting (check inspo video first)","Close-up of the detail","Reaction finding it"], note: "Watch the inspiration reel before the trip so you know exactly what to find." },
      { title: "Tiana's Bayou Adventure Reaction", platforms: ["TikTok","IG Reel"], timing: "LL: 5:10 – 6:10 PM", shots: ["Tiana's Bayou exterior","Queue through bayou theming","Family boarding the log","Atlas's face before the drop","Soaking wet reaction — guaranteed laughs","Best on-ride photo frame"], note: "40″ req — Atlas should be fine. Rider swap available. You WILL get wet — protect cameras." },
      { title: "Beak and Barrel Content", platforms: ["TikTok","IG Reel","IG Story"], timing: "6:05 PM reservation — 45 min", shots: ["Adventureland setting exterior","Themed interior — multiple pirate rooms","Rummy the parrot if visible","Cocktail beauty shots — colorful tropical drinks","Mocktail for Atlas","Atmosphere crowd shots"], note: "One of the hottest reservations in WDW. Great exclusive content — most people can't get in." },
      { title: "Peoplemover Shot", platforms: ["TikTok","IG Reel"], timing: "Tomorrowland", shots: ["Boarding the Peoplemover","Glide view over Tomorrowland","Looking down at crowds","Space Mountain from the Peoplemover angle"] },
      { title: "St. Patrick's Day Bonus", platforms: ["TikTok","IG Reel"], timing: "Throughout the day", shots: ["Green decorations or themed items","Green food or drinks if available","Kid wearing green","Lucky pin if found"] },
      { title: "Daily Recap — Day 3", platforms: ["TikTok","IG Reel","IG Carousel"], timing: "End of night", shots: ["Best 5–8 clips","Castle at golden hour","Atlas on Mine Train","Beak and Barrel highlight","Main Street at night"] },
    ]
  },
  {
    date: "Mar 18", day: "Wed", label: "Day 4", emoji: "🦁",
    location: "Animal Kingdom",
    accent: "#7BC47F",
    notes: "Rope drop Na'vi River Journey. Full day — Pandora, Expedition Everest, Zootopia, Kilimanjaro Safaris. 🔄 Rider swap needed for Everest (44″) + Flight of Passage (44″). Note: Rafiki's Planet Watch + Wildlife Express Train CLOSED (Feb 23, 2026 for Bluey retheme). DINOSAUR permanently gone — Dinoland USA is being demolished for Tropical Americas (Encanto/Indiana Jones land).",
    schedule: [
      { time: "Rope Drop", label: "Na'vi River Journey", type: "rope", note: "No height req — whole family. Pandora. Slow, beautiful dark ride through bioluminescent rainforest. Atlas will love it." },
      { time: "9:05 – 10:05 AM", label: "Kilimanjaro Safaris ⚡ LL", type: "ll", note: "No height req — whole family. Africa section. Animals most active in the morning — great LL timing." },
      { time: "Morning", label: "Festival of the Lion King", type: "rope", note: "No height req — whole family. Africa. 30-min live show with acrobatics, fire, and characters. One of the best shows at WDW. Check showtimes in app." },
      { time: "Morning", label: "Gorilla Falls Exploration Trail", type: "ll", note: "No req — whole family. Self-guided animal trail in Africa. Gorillas, hippos, birds. Great walking content between rides." },
      { time: "1:10 – 2:10 PM", label: "Zootopia ⚡ LL", type: "ll", note: "No height req — whole family. Check the app for current details on what this attraction is." },
      { time: "Afternoon", label: "It's Tough to Be a Bug!", type: "ll", note: "No height req. Inside the Tree of Life. 4D bug show — can be surprising/scary for little ones. Atlas might love it or hate it. Either reaction is content." },
      { time: "3:05 – 4:05 PM", label: "Na'vi River Journey ⚡ LL (x2)", type: "ll", note: "No height req — ride twice! Once at rope drop and again here. Worth it." },
      { time: "5:05 – 6:05 PM", label: "Avatar: Flight of Passage ⚡ LL — RIDER SWAP 🔄", type: "swap", note: "44″ req — Atlas can't ride. Rider swap needed. Parent 1 rides with LL, Parent 2 waits with Atlas in Pandora (gorgeous at this time). Parent 2 uses rider swap pass. Film Pandora while waiting — bioluminescence kicks in at dusk." },
      { time: "Note", label: "🚫 Expedition Everest — RIDER SWAP (44″)", type: "swap", note: "44″ req — Atlas can't ride. Rider swap available. Check standby or single rider. One of the best coasters and queues at WDW. Best views of Animal Kingdom from the top." },
      { time: "Note", label: "🚫 Rafiki's Planet Watch / Wildlife Express Train — CLOSED", type: "swap", note: "Closed Feb 23, 2026 for Bluey/Bingo themed experience. Reopens Summer 2026. Not available during your trip." },
      { time: "Note", label: "🚫 DINOSAUR / Dinoland USA — GONE", type: "swap", note: "Dinoland USA permanently closed and being demolished. Becoming Tropical Americas (Encanto dark ride + Indiana Jones reimagining). No timeline announced." },
    ],
    ideas: [
      { title: "Isn't Nature Beautiful", platforms: ["TikTok","IG Reel"], timing: "Morning walk-in", shots: ["Tree of Life wide then carved animal close-ups","Lush greenery and paths","Flamingos or visible live animals","Discovery Island canopy shot","Kid looking up at Tree of Life"] },
      { title: "Animal Kingdom B-Roll", platforms: ["TikTok","IG Reel"], timing: "Throughout the day", shots: ["Tree of Life from every angle","Pandora floating mountains","Harambe marketplace architecture","Asia district bridge","Expedition Everest mountain from afar","Oasis pathways and tropical plants"] },
      { title: "Kilimanjaro Safaris", platforms: ["TikTok","IG Reel"], timing: "LL: 9:05 – 10:05 AM", shots: ["Safari vehicle loading","Animals in the wild — giraffes, elephants, lions","Close-up animal moments","Atlas pointing at animals","Wide savanna landscape shots"], note: "Animals most active in the morning. Great LL timing." },
      { title: "Na'vi River Journey", platforms: ["TikTok","IG Reel"], timing: "Rope drop + 3:05 PM LL", shots: ["Pandora approach — floating mountains","River Journey queue — jungle theming","Glowing bioluminescent plants during ride","Na'vi Shaman animatronic","Family reaction exiting"], note: "Riding twice gives you two chances to get the shot." },
      { title: "Avatar — Flight of Passage (Rider Swap)", platforms: ["TikTok","IG Reel"], timing: "LL: 5:05 – 6:05 PM", shots: ["Flight of Passage exterior","Queue tunnel — Avatar DNA theming","Post-ride reaction — this one hits hard","Pandora at dusk while waiting — otherworldly lighting"], note: "44″ req — rider swap. The waiting parent should film Pandora — bioluminescence at dusk is peak content." },
      { title: "Expedition Everest", platforms: ["TikTok","IG Reel"], timing: "Anytime — check standby or single rider", shots: ["Mountain exterior — dramatic sky","Queue Yeti Museum — Himalayan artifacts","Yeti shrine detail","Boarding the train","Coming off — reaction"], note: "44″ req — rider swap. Single rider line usually short. One of the best queues in Disney." },
      { title: "Zootopia Drink + Cold Brew Flight", platforms: ["TikTok","IG Reel"], timing: "LL: 1:10 PM + anytime", shots: ["Zootopia theming","Zootopia drink beauty shot + first sip","Cold brew flight tray — overhead flat lay","Each cold brew close-up","Tasting reaction each","Favorite pick reveal"] },
      { title: "Animal Kingdom Ice Cream Sandwich", platforms: ["TikTok","IG Reel","IG Single"], timing: "Smiling Crocodile snack stand", shots: ["Ice cream sandwich handed over","Cookie and ice cream layers close-up","Atlas taking a giant bite","Melting close-up if it's warm"] },
      { title: "Collector Coin — Yak and Yeti", platforms: ["IG Reel"], timing: "Asia district", shots: ["Yak and Yeti exterior","Coin press machine","Coin being pressed — close-up","Finished coin held to camera","Atlas's reaction"] },
      { title: "Pandora at Night (Bioluminescence)", platforms: ["TikTok","IG Reel"], timing: "Stay through dusk — priority shot", shots: ["Floating mountains with bioluminescence glowing","Pandora pathways in blues and greens","River Journey exterior at night","Atlas in the glowing light"], note: "Pandora at night is one of the best shots you'll get all trip. Don't leave before dark." },
      { title: "Daily Recap — Day 4", platforms: ["TikTok","IG Reel","IG Carousel"], timing: "End of night", shots: ["Best 5–8 clips","Safari highlight","Pandora at night","Best animal moment","Atlas's best reaction"] },
    ]
  },
  {
    date: "Mar 19", day: "Thu", label: "Day 5", emoji: "🌸",
    location: "EPCOT — Flower & Garden",
    accent: "#A78BFA",
    notes: "Rope drop Frozen Ever After. Skyliner in. Flower and Garden Festival. World Showcase food tour. Remy's Ratatouille Adventure is a ride — try to fit it in. 🔄 Rider swap needed for Cosmic Rewind (42″). All rides open — Spaceship Earth reopened Oct 2025, Frozen Ever After reopened Feb 2026 with new animatronics, Test Track 3.0 opened summer 2025.",
    schedule: [
      { time: "Rope Drop", label: "Frozen Ever After", type: "rope", note: "No height req — whole family. Norway pavilion. Rope drop to avoid the long wait it builds. Atlas will know the movie. Just got updated animatronics in Feb 2026 — brand new faces for Elsa, Anna, Kristoff." },
      { time: "9:50 – 10:50 AM", label: "Spaceship Earth ⚡ LL", type: "ll", note: "No height req — whole family. Park entrance. Iconic slow dark ride through history of communication. Reopened Oct 2025 after refurbishment. Open and running." },
      { time: "Morning", label: "Test Track 3.0 ⚡ LL", type: "ll", note: "40″ req — Atlas is right at the line. World Discovery. Just reimagined in Summer 2025 — highest average wait at WDW right now (75 min). Design your own car concept, then test it. Hit 65 mph on the outdoor track. Get LL early." },
      { time: "Morning", label: "Mission: SPACE — Green Mission", type: "ll", note: "No height req for Green Mission (mild). Orange Mission is 40″ and more intense. Green is whole family. Spinning simulator in World Discovery. Skip Orange with Atlas — can cause nausea." },
      { time: "Morning", label: "Remy's Ratatouille Adventure ⚡ LL", type: "ll", note: "No height req — whole family. France pavilion. Shrink down to Remy's size and scurry through Gusteau's restaurant. Tier 1 LL — book early alongside Frozen. Updated from 3D to 2D in late 2025 for sharper visuals. Pure magic for kids." },
      { time: "12:55 – 1:55 PM", label: "Soarin' ⚡ LL", type: "ll", note: "40″ req — Atlas is right at the line. The Land pavilion. Giant hang-gliding simulator over world landmarks. Rider swap available just in case. Still 'Around the World' version — Soarin' Across America doesn't open until Memorial Day 2026." },
      { time: "Afternoon", label: "Living with the Land", type: "ll", note: "No height req — whole family. The Land pavilion, same building as Soarin'. Slow boat ride through Disney's actual working greenhouse and aquaculture facility. Genuinely interesting. Good for a breather after Soarin'." },
      { time: "Afternoon", label: "Journey Into Imagination with Figment", type: "ll", note: "No height req — whole family. World Celebration. Classic EPCOT dark ride with Figment the dragon. Weird and beloved. Great pin content too." },
      { time: "Afternoon", label: "Turtle Talk with Crush", type: "ll", note: "No height req. World Nature / The Seas. Live interactive show where Crush 'talks' to the audience in real time. Atlas will love it. Good mid-afternoon break." },
      { time: "Afternoon", label: "The Seas with Nemo & Friends", type: "ll", note: "No height req — whole family. World Nature. Slow clamshell ride through a simulated ocean with Nemo characters. Easy, cool, good for Atlas between bigger rides." },
      { time: "5:05 – 6:05 PM", label: "Cosmic Rewind ⚡ LL — RIDER SWAP 🔄", type: "swap", note: "42″ req — Atlas can't ride (he's 40″). Use rider swap. Reverse-launch story coaster — the music and visuals are wild. Great reaction content." },
      { time: "8:00 – 9:00 PM", label: "Remy's Ratatouille Adventure 🎢 (or dining)", type: "dining", note: "If you didn't ride Remy's earlier, this time slot could work. Alternatively this may be your Bistrot Chez Rémy dining reservation — confirm in your app which you booked." },
    ],
    ideas: [
      { title: "Coffee at the Skyliner — EPCOT Morning", platforms: ["TikTok","IG Reel"], timing: "Skyliner to EPCOT", shots: ["Coffee in hand on the gondola","EPCOT International Gateway coming into view","Stepping into France/UK side","Morning light on the lagoon"] },
      { title: "EPCOT Vibes + Flower & Garden Festival", platforms: ["TikTok","IG Reel"], timing: "Throughout the day", shots: ["Spaceship Earth wide — morning + evening","World Showcase Lagoon reflections","Festival topiary characters","Flower walls and floral displays","Outdoor kitchen booth walkthrough","Festival passport getting stamped"] },
      { title: "Frozen Ever After — Rope Drop", platforms: ["TikTok","IG Reel"], timing: "Rope drop — Norway", shots: ["Norway pavilion stave church exterior","Queue — Arendelle theming","Boarding the boat","Atlas's reaction to Elsa and Anna","Post-ride reaction"] },
      { title: "Foods to Try at EPCOT — Full Tour", platforms: ["TikTok","IG Carousel"], timing: "World Showcase", shots: ["Each food item — beauty shot before eating","Quick tasting reaction each","World Showcase walkway + booth signage","Best bites close-up"], note: "Frame as 'Top 5 Things to Eat at EPCOT.'" },
      { title: "France Pavilion — Croissant + Les Halles", platforms: ["TikTok","IG Reel","IG Carousel"], timing: "France pavilion", shots: ["France pavilion entrance arch","Les Halles storefront","Pastry display case wide + close","Croissant pulled from case","Cross-section — flaky layers","First bite reaction","Eiffel Tower replica in background"] },
      { title: "Not-So-Hidden Detail in Remy's", platforms: ["TikTok","IG Reel"], timing: "Remy's queue", shots: ["Remy's exterior in France pavilion","Queue walk — the specific hidden detail (watch inspo first)","Close-up of the detail","Reaction finding it"], note: "Watch the inspiration reel before the day." },
      { title: "Italy — Pizza at Via Napoli", platforms: ["TikTok","IG Reel"], timing: "Italy pavilion", shots: ["Via Napoli exterior","Pizza out of the wood-fired oven","Full pizza overhead","Cheese pull — slow lift of a slice","First bite reaction"] },
      { title: "Norway — Lemon Bolle (Kringla)", platforms: ["TikTok","IG Reel","IG Story"], timing: "Norway pavilion", shots: ["Kringla Bakeri storefront","Lemon Bolle handed over — beauty shot","First bite — show lemon curd inside","Norway stave church in background"] },
      { title: "Frosé + Grey Stuff Cotton Candy + Orange Cream Shake", platforms: ["TikTok","IG Reel","IG Carousel"], timing: "World Showcase", shots: ["Frosé being poured — color is the star","Grey stuff cotton candy — puff close-up, pulling apart, Atlas eating it (it'll get everywhere)","Orange cream milkshake — reveal, first sip while walking"] },
      { title: "Cosmic Rewind — Rider Swap", platforms: ["TikTok","IG Reel"], timing: "LL: 5:05 – 6:05 PM", shots: ["Guardians Cosmic Rewind exterior","Wonders of Xandar theming","Post-ride reaction — surprises people","Waiting parent + Atlas doing something fun nearby"], note: "42″ req — Atlas can't ride. Reverse launch shocks people — great reaction content." },
      { title: "Remy's / France Pavilion Evening", platforms: ["TikTok","IG Reel"], timing: "8:00 PM", shots: ["France pavilion at night — beautiful lighting","Remy's or Bistrot Chez Rémy entrance","Food and drinks being served","Family at the table — candid dinner","France pavilion stroll after dinner"] },
      { title: "Photo Booth", platforms: ["TikTok","IG Reel"], timing: "Wherever you find it", shots: ["Photo booth exterior","Family posing inside","Reveal of the photo strip","Reactions"] },
      { title: "Daily Recap — Day 5", platforms: ["TikTok","IG Reel","IG Carousel"], timing: "End of night", shots: ["Best 5–8 clips","Festival highlight","Food tour moments","Atlas's best moment","Spaceship Earth lit up at night"] },
    ]
  },
  {
    date: "Mar 20", day: "Fri", label: "Day 6", emoji: "⚓",
    location: "Beach Club + Disney Springs",
    accent: "#F472B6",
    notes: "Check-out day. Resort hop to Beach Club and Yacht Club. Disney Springs for last snacks and pins. Driving home to VA this evening — 7 hours, plan to leave by late afternoon to get home at a reasonable time.",
    schedule: [],
    ideas: [
      { title: "Beach Club + Yacht Club Resort Hop", platforms: ["TikTok","IG Reel"], timing: "Morning", shots: ["Beach Club exterior — nautical New England feel","Stormalong Bay pool area","Yacht Club exterior — elegant","Boardwalk walkway along the water","Crescent Lake path","Atlas running on the boardwalk"] },
      { title: "Easter Whoopie Pie", platforms: ["TikTok","IG Reel","IG Single"], timing: "Beach Club / Boardwalk bakeries", shots: ["Whoopie pie in display case","Easter decoration detail","Beauty shot","Pulling apart to show filling","First bite"], note: "Check Beach Club, Yacht Club, or Boardwalk Bakery." },
      { title: "Cake Bake — Coffee and Cake", platforms: ["TikTok","IG Reel"], timing: "Boardwalk area", shots: ["Cake Bake exterior","Cake display case","Coffee being served","Cake slice — layers visible","First forkful reaction"], note: "Confirm exact location before the day." },
      { title: "Disney Springs — Last Day", platforms: ["TikTok","IG Reel"], timing: "Afternoon", shots: ["Disney Springs crowd atmosphere","Final snack of the trip","Last pin trade","Family walking through the Springs","Last look at Disney before leaving"] },
      { title: "Seeing People Arrive When You Leave", platforms: ["TikTok","IG Reel"], timing: "Springs or resort lobby on the way out", shots: ["Families arriving fresh — suitcases, excitement","Sean watching with exhausted-but-happy expression","Atlas half-asleep or dragging feet","Final look back before leaving"], note: "One of the best ideas on the list. Don't miss this one." },
      { title: "This Memory Might Fade", platforms: ["TikTok","IG Reel"], timing: "Last moments before leaving", shots: ["Slow reflective B-roll of last moments","Atlas seeing Springs one last time","Family moment","Car loaded, about to leave","Highway heading home"], note: "Save for the very end. Emotional, nostalgic. Could be the best piece of the whole trip." },
      { title: "My Way Home (Kanye West)", platforms: ["IG Story","IG Single"], timing: "Drive home Friday evening", shots: ["Road from the car — driving away","Last Disney signage in the rearview","Atlas asleep in the car","Sunset on the drive home"] },
      { title: "7 Days / Zero Problems — Final Edit", platforms: ["TikTok","IG Reel"], timing: "Edit at home", shots: ["Best clips from all 6 days","Match energy to the song — beat drops","Kid moments, food moments, ride reactions","End on something emotional or triumphant"], note: "Assemble from everything collected all week." },
      { title: "Full Trip Wrap Recap", platforms: ["TikTok","IG Reel","IG Carousel"], timing: "End of trip", shots: ["Best moments from the final day","Look back at all 4 parks — first time doing all four","Family on the way home","Atlas's highlights"] },
    ]
  }
];

const PLATFORM_STYLES = {
  "TikTok":      { bg: "rgba(255,79,45,0.15)", border: "rgba(255,79,45,0.4)", text: "#ff6b4d" },
  "IG Reel":     { bg: "rgba(193,53,132,0.15)", border: "rgba(193,53,132,0.4)", text: "#e05ba0" },
  "IG Carousel": { bg: "rgba(64,93,230,0.15)", border: "rgba(64,93,230,0.4)", text: "#7b8fef" },
  "IG Single":   { bg: "rgba(247,119,55,0.15)", border: "rgba(247,119,55,0.4)", text: "#f78a40" },
  "IG Story":    { bg: "rgba(252,175,69,0.15)", border: "rgba(252,175,69,0.4)", text: "#f5a623" },
};

const SCHED_STYLES = {
  rope:   { bg: "rgba(123,196,127,0.12)", border: "rgba(123,196,127,0.35)", icon: "★", iconColor: "#7BC47F", label: "Rope Drop" },
  ll:     { bg: "rgba(91,155,213,0.12)", border: "rgba(91,155,213,0.35)", icon: "⚡", iconColor: "#5B9BD5", label: "Lightning Lane" },
  dining: { bg: "rgba(245,200,66,0.12)", border: "rgba(245,200,66,0.35)", icon: "♦", iconColor: "#F5C842", label: "Dining" },
  swap:   { bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.35)", icon: "↔", iconColor: "#A78BFA", label: "Rider Swap" },
};

const STORAGE_KEY = "disney2026_progress";

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5, delay: Math.random() * 4, dur: Math.random() * 3 + 2,
  }));
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <defs><style>{`@keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }`}</style></defs>
      {stars.map(s => (
        <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.size}
          fill="white" opacity="0.4"
          style={{ animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite` }} />
      ))}
    </svg>
  );
}

function CastleSilhouette() {
  return (
    <svg viewBox="0 0 400 120" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(400px,100%)", opacity: 0.06, pointerEvents: "none" }} fill="white">
      <path d="M160,120 L160,70 L155,70 L155,50 L160,50 L160,30 L165,25 L170,30 L170,50 L175,50 L175,70 L170,70 L170,120 Z" />
      <path d="M180,120 L180,60 L176,60 L176,45 L180,45 L180,35 L184,30 L188,35 L188,45 L192,45 L192,60 L188,60 L188,120 Z" />
      <rect x="155" y="65" width="40" height="55" />
      <path d="M175,25 L165,35 L185,35 Z" /><path d="M184,20 L178,30 L190,30 Z" />
      <path d="M130,120 L130,80 L126,80 L126,65 L130,65 L130,55 L133,52 L136,55 L136,65 L140,65 L140,80 L136,80 L136,120 Z" />
      <rect x="126" y="76" width="18" height="44" />
      <path d="M220,120 L220,80 L216,80 L216,65 L220,65 L220,55 L223,52 L226,55 L226,65 L230,65 L230,80 L226,80 L226,120 Z" />
      <rect x="216" y="76" width="18" height="44" />
      <rect x="100" y="95" width="200" height="25" /><rect x="90" y="100" width="220" height="20" />
    </svg>
  );
}

function Checkmark({ checked, accent, size = 18 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      border: `2px solid ${checked ? accent : "rgba(255,255,255,0.2)"}`,
      background: checked ? accent : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.2s", cursor: "pointer",
    }}>
      {checked && (
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 10 10" fill="none">
          <path d="M2 5.5L4 7.5L8 3" stroke="#0b0d1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default function DisneyCalendar() {
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("schedule");
  const [expanded, setExpanded] = useState({});
  const [allOpen, setAllOpen] = useState(false);
  const [checked, setChecked] = useState({});
  const headerRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch (e) {}
  }, [checked]);

  const day = DAYS[activeDay];

  useEffect(() => {
    setExpanded({});
    setAllOpen(false);
    setTab(day.schedule.length > 0 ? "schedule" : "content");
  }, [activeDay]);

  const toggle = (i) => setExpanded(p => ({ ...p, [`${activeDay}-${i}`]: !p[`${activeDay}-${i}`] }));

  const toggleAll = () => {
    const next = !allOpen;
    setAllOpen(next);
    const map = {};
    day.ideas.forEach((_, i) => { map[`${activeDay}-${i}`] = next; });
    setExpanded(p => ({ ...p, ...map }));
  };

  // Checkbox helpers
  const ideaKey = (dayIdx, ideaIdx) => `d${dayIdx}-i${ideaIdx}`;
  const shotKey = (dayIdx, ideaIdx, shotIdx) => `d${dayIdx}-i${ideaIdx}-s${shotIdx}`;

  const toggleIdea = (e, dayIdx, ideaIdx) => {
    e.stopPropagation();
    const idea = DAYS[dayIdx].ideas[ideaIdx];
    const ik = ideaKey(dayIdx, ideaIdx);
    const nowChecked = !checked[ik];
    setChecked(p => {
      const next = { ...p, [ik]: nowChecked };
      // Also check/uncheck all shots
      idea.shots.forEach((_, si) => {
        next[shotKey(dayIdx, ideaIdx, si)] = nowChecked;
      });
      return next;
    });
  };

  const toggleShot = (e, dayIdx, ideaIdx, shotIdx) => {
    e.stopPropagation();
    const sk = shotKey(dayIdx, ideaIdx, shotIdx);
    setChecked(p => {
      const next = { ...p, [sk]: !p[sk] };
      // Update idea check state based on all shots
      const idea = DAYS[dayIdx].ideas[ideaIdx];
      const allShotsChecked = idea.shots.every((_, si) => next[shotKey(dayIdx, ideaIdx, si)]);
      next[ideaKey(dayIdx, ideaIdx)] = allShotsChecked;
      return next;
    });
  };

  // Progress calculations
  const getDayProgress = (dayIdx) => {
    const d = DAYS[dayIdx];
    const totalShots = d.ideas.reduce((sum, idea) => sum + idea.shots.length, 0);
    const doneShots = d.ideas.reduce((sum, idea, ii) =>
      sum + idea.shots.filter((_, si) => checked[shotKey(dayIdx, ii, si)]).length, 0);
    const doneIdeas = d.ideas.filter((_, ii) => checked[ideaKey(dayIdx, ii)]).length;
    return { doneIdeas, totalIdeas: d.ideas.length, doneShots, totalShots };
  };

  const currentProgress = getDayProgress(activeDay);

  const clearDay = () => {
    setChecked(p => {
      const next = { ...p };
      day.ideas.forEach((idea, ii) => {
        delete next[ideaKey(activeDay, ii)];
        idea.shots.forEach((_, si) => delete next[shotKey(activeDay, ii, si)]);
      });
      return next;
    });
  };

  return (
    <div style={{ fontFamily: "'Nunito', 'Trebuchet MS', system-ui, sans-serif", background: "#0b0d1f", minHeight: "100vh", color: "#e8e6ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@1,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#F5C842;border-radius:2px;}
        button{font-family:inherit;cursor:pointer;border:none;outline:none;}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .day-btn:hover{transform:translateY(-2px);transition:all 0.2s;}
        .idea-row{transition:background 0.15s;}
        .idea-row:hover{background:rgba(255,255,255,0.04)!important;}
        .shot-li:hover{background:rgba(245,200,66,0.06);border-radius:3px;}
        .tab-btn{transition:all 0.2s;}
        .tab-btn:hover{opacity:0.85;}
        .sched-card{transition:transform 0.15s;}
        .sched-card:hover{transform:translateX(2px);}
        .check-circle:hover{transform:scale(1.15);}
        .check-circle{transition:all 0.15s;}
      `}</style>

      {/* HEADER */}
      <div ref={headerRef} style={{ position: "sticky", top: 0, zIndex: 200, overflow: "hidden", background: "linear-gradient(180deg, #050720 0%, #0b0d1f 100%)", borderBottom: "1px solid rgba(245,200,66,0.2)" }}>
        <Stars />
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 20px 0", position: "relative" }}>
          <CastleSilhouette />
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 2 }}>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 30, fontWeight: 700, background: "linear-gradient(90deg, #F5C842, #fff8d6, #F5C842)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 4s linear infinite" }}>
                Disney World 2026
              </h1>
              <span style={{ fontSize: 12, color: "rgba(245,200,66,0.6)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Sean's Content Guide</span>
            </div>
            <p style={{ fontSize: 11, color: "rgba(232,230,255,0.4)", marginBottom: 14, fontWeight: 600, letterSpacing: "0.05em" }}>MARCH 15 – 20 &nbsp;•&nbsp; POP CENTURY</p>

            {/* DAY TABS */}
            <div style={{ display: "flex", gap: 2, overflowX: "auto", paddingBottom: 0 }}>
              {DAYS.map((d, i) => {
                const active = activeDay === i;
                const prog = getDayProgress(i);
                const pct = prog.totalShots > 0 ? Math.round((prog.doneShots / prog.totalShots) * 100) : 0;
                return (
                  <button key={i} className="day-btn" onClick={() => setActiveDay(i)}
                    style={{ background: active ? d.accent : "transparent", border: `1px solid ${active ? d.accent : "rgba(245,200,66,0.15)"}`, color: active ? "#0b0d1f" : "rgba(232,230,255,0.5)", padding: "8px 10px 6px", borderRadius: "8px 8px 0 0", fontWeight: active ? 800 : 600, fontSize: 11, whiteSpace: "nowrap", minWidth: 64, transition: "all 0.2s", borderBottom: active ? "none" : "1px solid rgba(245,200,66,0.15)", position: "relative" }}>
                    <div style={{ fontSize: 16, lineHeight: 1, marginBottom: 2 }}>{d.emoji}</div>
                    <div style={{ letterSpacing: "0.03em" }}>{d.label}</div>
                    <div style={{ fontSize: 9, opacity: 0.8, marginTop: 1 }}>{d.date}</div>
                    {pct > 0 && (
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: active ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.08)", borderRadius: "0 0 0 0" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: active ? "rgba(0,0,0,0.4)" : d.accent, borderRadius: 2, transition: "width 0.4s ease" }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 14px 60px", animation: "fadeUp 0.3s ease" }}>

        {/* DAY HEADER CARD */}
        <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", border: `1px solid ${day.accent}44`, borderLeft: `3px solid ${day.accent}`, borderRadius: 12, padding: "16px 18px", marginBottom: 18, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${day.accent}18 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{day.emoji}</span>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 20, color: "#fff", lineHeight: 1.2, marginBottom: 3 }}>{day.location}</h2>
                <span style={{ fontSize: 10, color: day.accent, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>{day.date} • {day.day}</span>
              </div>
            </div>
            {/* Progress pill */}
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              <div style={{ background: `${day.accent}18`, border: `1px solid ${day.accent}33`, borderRadius: 8, padding: "6px 12px", display: "inline-block" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: day.accent, lineHeight: 1 }}>
                  {currentProgress.doneIdeas}/{currentProgress.totalIdeas}
                </div>
                <div style={{ fontSize: 9, color: `${day.accent}99`, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>ideas done</div>
                <div style={{ fontSize: 10, color: "rgba(232,230,255,0.4)", fontWeight: 600, marginTop: 3 }}>
                  {currentProgress.doneShots}/{currentProgress.totalShots} shots
                </div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "rgba(232,230,255,0.6)", lineHeight: 1.6 }}>{day.notes}</p>
          {/* Progress bar */}
          {currentProgress.totalShots > 0 && (
            <div style={{ marginTop: 12, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${Math.round((currentProgress.doneShots / currentProgress.totalShots) * 100)}%`,
                background: `linear-gradient(90deg, ${day.accent}99, ${day.accent})`,
                borderRadius: 2, transition: "width 0.4s ease"
              }} />
            </div>
          )}
        </div>

        {/* TABS */}
        {day.schedule.length > 0 && (
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {["schedule","content"].map(t => (
              <button key={t} className="tab-btn" onClick={() => setTab(t)}
                style={{ background: tab === t ? day.accent : "rgba(255,255,255,0.04)", color: tab === t ? "#0b0d1f" : "rgba(232,230,255,0.5)", border: `1px solid ${tab === t ? day.accent : "rgba(255,255,255,0.1)"}`, padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: tab === t ? 800 : 600 }}>
                {t === "schedule" ? `📅 Schedule (${day.schedule.length})` : `🎬 Content (${day.ideas.length})`}
              </button>
            ))}
          </div>
        )}

        {/* SCHEDULE */}
        {tab === "schedule" && day.schedule.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 6 }}>
              {Object.entries(SCHED_STYLES).map(([key, s]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(232,230,255,0.4)", fontWeight: 600 }}>
                  <span style={{ color: s.iconColor, fontSize: 13 }}>{s.icon}</span>{s.label}
                </div>
              ))}
            </div>
            {day.schedule.map((item, i) => {
              const s = SCHED_STYLES[item.type];
              return (
                <div key={i} className="sched-card" style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: s.iconColor, fontSize: 18, flexShrink: 0, lineHeight: 1, marginTop: 1, fontWeight: 700 }}>{s.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 5 }}>
                        <span style={{ fontWeight: 800, fontSize: 13, color: "#fff" }}>{item.label}</span>
                        <span style={{ background: `${s.iconColor}22`, color: s.iconColor, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, border: `1px solid ${s.iconColor}44`, letterSpacing: "0.04em" }}>{item.time}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "rgba(232,230,255,0.55)", lineHeight: 1.5 }}>{item.note}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CONTENT IDEAS */}
        {(tab === "content" || day.schedule.length === 0) && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: "rgba(232,230,255,0.35)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{day.ideas.length} Content Ideas</span>
              <div style={{ display: "flex", gap: 6 }}>
                {currentProgress.doneShots > 0 && (
                  <button className="tab-btn" onClick={clearDay}
                    style={{ background: "rgba(255,79,45,0.1)", color: "rgba(255,79,45,0.6)", border: "1px solid rgba(255,79,45,0.2)", padding: "5px 12px", borderRadius: 7, fontSize: 11, fontWeight: 700 }}>
                    Reset Day
                  </button>
                )}
                <button className="tab-btn" onClick={toggleAll}
                  style={{ background: "rgba(245,200,66,0.12)", color: "#F5C842", border: "1px solid rgba(245,200,66,0.3)", padding: "5px 14px", borderRadius: 7, fontSize: 11, fontWeight: 800, letterSpacing: "0.04em" }}>
                  {allOpen ? "Collapse All" : "Expand All"}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {day.ideas.map((idea, i) => {
                const isOpen = expanded[`${activeDay}-${i}`];
                const ideaDone = !!checked[ideaKey(activeDay, i)];
                const shotsDone = idea.shots.filter((_, si) => checked[shotKey(activeDay, i, si)]).length;
                const allShotsDone = shotsDone === idea.shots.length;

                return (
                  <div key={i} className="idea-row"
                    onClick={() => toggle(i)}
                    style={{
                      background: ideaDone
                        ? `rgba(${day.accent.replace('#','').match(/../g).map(x=>parseInt(x,16)).join(',')},0.06)`
                        : isOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${ideaDone ? day.accent + "33" : isOpen ? "rgba(245,200,66,0.2)" : "rgba(255,255,255,0.07)"}`,
                      borderRadius: 10, overflow: "hidden", cursor: "pointer", transition: "all 0.2s",
                      opacity: ideaDone ? 0.6 : 1
                    }}>

                    {/* Row Header */}
                    <div style={{ padding: "11px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1, minWidth: 0 }}>
                        {/* Idea-level checkmark */}
                        <div className="check-circle" style={{ marginTop: 1 }} onClick={(e) => toggleIdea(e, activeDay, i)}>
                          <Checkmark checked={ideaDone} accent={day.accent} size={20} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: ideaDone ? "rgba(232,230,255,0.45)" : "#fff", marginBottom: 5, lineHeight: 1.3, textDecoration: ideaDone ? "line-through" : "none", textDecorationColor: "rgba(232,230,255,0.3)" }}>{idea.title}</div>
                          {idea.timing && (
                            <div style={{ fontSize: 10, color: day.accent, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 5 }}>⏱ {idea.timing}</div>
                          )}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                            {idea.platforms.map(p => {
                              const ps = PLATFORM_STYLES[p] || { bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)", text: "rgba(232,230,255,0.6)" };
                              return (
                                <span key={p} style={{ background: ps.bg, color: ps.text, border: `1px solid ${ps.border}`, fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p}</span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        {/* Shot progress mini counter */}
                        {shotsDone > 0 && (
                          <span style={{ fontSize: 10, color: allShotsDone ? day.accent : "rgba(232,230,255,0.35)", fontWeight: 700, background: allShotsDone ? `${day.accent}18` : "rgba(255,255,255,0.04)", border: `1px solid ${allShotsDone ? day.accent + "44" : "rgba(255,255,255,0.08)"}`, padding: "2px 7px", borderRadius: 10 }}>
                            {shotsDone}/{idea.shots.length}
                          </span>
                        )}
                        <span style={{ color: isOpen ? day.accent : "rgba(232,230,255,0.25)", fontSize: 18, transform: isOpen ? "rotate(90deg)" : "none", transition: "all 0.2s", lineHeight: 1 }}>›</span>
                      </div>
                    </div>

                    {/* Expanded shots */}
                    {isOpen && (
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)", padding: "12px 14px 14px" }}>
                        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", color: day.accent, textTransform: "uppercase", marginBottom: 10 }}>Shots to Get</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          {idea.shots.map((shot, si) => {
                            const shotDone = !!checked[shotKey(activeDay, i, si)];
                            return (
                              <div key={si} className="shot-li"
                                onClick={(e) => toggleShot(e, activeDay, i, si)}
                                style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 5px", cursor: "pointer", borderRadius: 4 }}>
                                <div className="check-circle" style={{ marginTop: 1.5, flexShrink: 0 }}>
                                  <Checkmark checked={shotDone} accent={day.accent} size={15} />
                                </div>
                                <span style={{
                                  color: shotDone ? "rgba(232,230,255,0.3)" : "rgba(232,230,255,0.75)",
                                  fontSize: 12, lineHeight: 1.45,
                                  textDecoration: shotDone ? "line-through" : "none",
                                  textDecorationColor: "rgba(232,230,255,0.25)",
                                  transition: "all 0.2s"
                                }}>{shot}</span>
                              </div>
                            );
                          })}
                        </div>
                        {idea.note && (
                          <div style={{ marginTop: 10, padding: "8px 11px", background: `${day.accent}10`, border: `1px solid ${day.accent}28`, borderRadius: 6, fontSize: 11, color: `${day.accent}cc`, lineHeight: 1.5 }}>
                            <span style={{ fontWeight: 800 }}>Note: </span>{idea.note}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "20px", borderTop: "1px solid rgba(245,200,66,0.1)" }}>
        <span style={{ fontSize: 10, color: "rgba(232,230,255,0.2)", letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase" }}>✦ &nbsp; March 2026 &nbsp; ✦ &nbsp; Have the best trip &nbsp; ✦</span>
      </div>
    </div>
  );
}
