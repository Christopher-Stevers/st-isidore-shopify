import {Link} from '@remix-run/react';
import {useEffect, useMemo, useState} from 'react';

const recipes = [
  {
    cut_name: 'Ribeye',
    h1: 'Pan-Seared Ribeye Steak',
    description:
      "Rib eye is one of our most popular cuts. It's a great steak for grilling or pan-searing.",
    image_src:
      'https://cdn.shopify.com/s/files/1/0626/1991/0197/files/IMG_20240729_161801.jpg?v=1747859298',
    ingredients: ['2  1 inch thick ribeye steaks', 'Salt', 'Pepper', 'Butter'],
    instructions: [
      'Thaw steaks completely before cooking, preferably in the refrigerator.',
      'Heat a cast iron or stainless steel skillet to medium-high heat. Add about 2 tablespoons of butter.',
      'Pat the seasonings into both sides of the steaks.',
      'Using tongs, sear top, bottom and sides',
      'Add a little more butter on the top side of each steak.',
      'Turn down the heat',
      'Cover the pan and cook for approximately 5 minutes. Flip the steaks, cover, and cook for another 4-5 minutes.',
      'Use a meat thermometer to check for your desired doneness (125-135°F is recommended for rare to medium-rare).',
      'Remove steaks from the pan, place them on a plate, and cover. Let them rest for 5-10 minutes before cutting to serve.',
    ],
  },
  {
    cut_name: 'Tenderloin',
    h1: 'Steak with Grilled Vegetables and Pesto Quinoa',
    description:
      'Wholesome and delicious, Tenderloin steak is iron-rich plus since it’s super tender, it’s perfectly suited for everyone at the table.',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2020/08/Beef-Tenderloin-Grilled-Veg-Pesto-Quinoa-FEATURE1.jpg',
    ingredients: [
      '2 tbsp plain Greek yogurt',
      '2 tbsp prepared pesto',
      '2 cups cooked quinoa (made from ¾ cup uncooked)',

      '2 cloves garlic, minced',
      '2 tbsp balsamic vinegar',
      '1 tsp orange zest',
      '2 tbsp orange juice',
      '2 tbsp grainy Dijon mustard',
      '1 tbsp maple syrup',
      '¼ cup olive oil',
      '16 cherry tomatoes',
      '1 red or orange sweet pepper, sliced',
      '1 zucchini, sliced on a diagonal',
      '½ small eggplant, sliced',

      '4 Beef Tenderloin Grilling Steaks Strip Loin Medallions, about ¾-inch thick (4 oz/125 g each)',
      '¾ tsp EACH salt and pepper, divided',
    ],
    instructions: [
      'Creamy Pesto Quinoa: Whisk yogurt with pesto; drizzle over cooked quinoa and toss to coat. Set aside. (Can be served warm, room temperature or chilled.)',
      'Steak and Vegetables: In small bowl whisk garlic, vinegar, orange zest and juice, Dijon mustard and maple syrup. Slowly whisk in oil and use ⅓ of a cup of this dressing to toss with the veggies. Arrange vegetables in an even layer in a grill basket. Set aside remaining dressing.',
      'Preheat grill to medium-high heat; grease the grates well. Grill veggies in closed barbecue, tossing occasionally, for 8 to 10 minutes or until tender-crisp. Transfer to a platter and season with ¼ tsp each salt and pepper; tent with foil.',
      'Meanwhile, season steaks with remaining salt and pepper; brush with the reserved dressing and set aside.',
      'Grill steak in closed barbecue, turning at least twice, for 8 to 10 minutes or until an instant read thermometer inserted sideways into the steak reads 135ºF (58ºC) for medium-rare. Transfer to a cutting board and rest for 5 minutes before serving. Serve steaks with quinoa and vegetables.',
    ],
  },
  {
    cut_name: 'Top Sirloin',
    h1: 'Stout Beer Top Sirloin Beef Skewers',
    description: '',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2022/03/Stout-Beer-Top-Sirloin-Beef-Skewers.jpg',
    ingredients: [
      '1.5 kg top sirloin beef roast or steak, cut into ½ inch thick, 4-to-6-inch strips, approximately 48 pieces',
      '1 bottle stout beer',
      '8 cloves garlic, minced',
      '2 tbsp brown sugar',
      '1 tbsp chopped, fresh rosemary',
      '1 tbsp prepared horseradish',
      '1 tsp cracked black pepper',
      '1 tsp red pepper chili flakes',
      '2 tsp kosher salt',
      '2 tbsp olive oil',
      '1 big bunch, fresh rosemary',
      '½ cup stout beer',
      '½ cup brown sugar',
      '¼ cup honey',
      '2 tbsp ketchup',
      '1 tsp Worcestershire sauce',
      '2 cloves garlic, minced',
      'Pinch kosher salt',
      'Pinch freshly ground black pepper',
      '¼ cup butter',
      '½ cup crushed salty pretzels',
    ],
    instructions: [
      'Using a sharp knife, cut the top sirloin into ½ inch thick long slices. Nice and uniform in shape so that they cook evenly. Place the strips of top sirloin into a self-sealing plastic bag. Pour in the bottle of beer, garlic, brown sugar, rosemary, horseradish, black pepper, chili flakes, salt and olive oil. Seal bag and gently mix so that the beef is evenly coated. Place in refrigerator and marinate for 2 hours.',
      'Soak wooden skewers for 1 hour in cold water.',
      'Remove beef from beer marinade, discarding leftover marinade.',
      'Thread the pieces of marinated beef onto each skewer and set them aside for 30 minutes.',
      'Take the bunches of rosemary and tie them together at one end with butcher’s twine to make yourself a rosemary basting brush. Set aside.',
      'To prepare the Stout Beer BBQ Baste, combine the beer, brown sugar, honey, ketchup, Worcestershire sauce and garlic in a small saucepot. Then season to taste with salt and pepper. Bring to a low boil and add in the butter. Remove from heat and stir until the butter is incorporated. Set aside, keeping warm.',
      'Preheat grill to medium-high, approximately 450°F–550°F (230°C–280°C).',
      'Grill beef skewers for 2-4 minutes per side rotating the skewers at least 3 times. Using the rosemary basting brush, baste liberally with the reserved Stout Beer BBQ Baste. Remove from grill Sprinkle with crushed salt pretzels and serve immediately.',
    ],
  },
  {
    cut_name: 'Flank/Skirt/Hangar Steak',
    h1: 'Ras el Hanout Flank Steak Pita',
    description: '',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2022/06/RasAlHanoutMarinatedFlankSteakPita-e1686332507249.png',
    ingredients: [
      '1 red onion, thinly sliced',
      '1 cup (250 mL) EACH red wine vinegar and hot water',
      '2 green onions, trimmed and finely chopped',
      '1 clove garlic, finely chopped',
      'Grated zest of 1 lemon',
      '1 cup (250 mL) EACH chopped fresh Italian parsley and cilantro',
      '1 tbsp (15 mL) hot pepper flakes',
      '¾ tsp (4 mL) kosher salt',
      '¼ tsp (1 mL) ground cumin',
      '⅛ tsp (0.5 mL) ground cinnamon',
      '¾ cup (175 mL) extra virgin olive oil',
      '2 tbsp (30 mL) red wine vinegar',
      '1 tsp (5 mL) EACH ground cumin, ground ginger and kosher salt',
      '¾ tsp (4 mL) fresh ground pepper',
      '½ tsp (2 mL) EACH ground cinnamon, coriander and allspice',
      '½ tsp (2 mL) cayenne pepper',
      '¼ tsp (1 mL) ground cloves',
      '1 lb (500 g) Beef Flank Steak, about 1 inch (2.5 cm) thick',
      '1 tsp (5 mL) butter',
      '3 Greek pita (with pocket)',
      'Fresh dill sprigs',
      'Fresh cilantro and Italian parsley leaves',
      'Labneh or plain Greek yogurt',
    ],
    instructions: [
      'Pickled Red Onions: Place onions in a heatproof boil. Combine vinegar and boiling water in a measuring cup; pour over sliced onions. Cover and let stand for at least 1 hour.',
      'Chermoula: Combine green onions, garlic, lemon zest, parsley, cilantro, hot pepper flakes, salt, cumin, cinnamon, oil and vinegar in a bowl, mixing well. Cover and set aside until serving.',
      'Flank Steak Combine cumin, ginger, salt, pepper, cinnamon, coriander, allspice, cayenne and cloves in a small bowl to make ras al hanout seasoning.',
      'Rub steak all over with ras al hanout seasoning and oil. Grill in a closed preheated barbecue or pan-fry in a cast-iron skillet using medium-high heat for 10 to 12 minutes, turning twice or more, until a digital instant-read thermometer inserted sideways into steak reads 145°F (63°C) for medium-rare.',
      'Transfer to a cutting board and let rest for 5 minutes. Cut into thin slices across the grain.',
      'Cut each pita in half and open pocket. Tuck in 2 to 3 slices of steak, and top with some of the Pickled Red Onions, fresh dill, parsley and cilantro leaves, labneh and a spoonful of Chermoula.',
    ],
  },

  {
    cut_name: 'Flap',
    h1: 'Stout Beer Top Sirloin Beef Skewers',
    description: '',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2022/03/Stout-Beer-Top-Sirloin-Beef-Skewers.jpg',
    ingredients: [
      '1.5 kg top sirloin beef roast or steak, cut into ½ inch thick, 4-to-6-inch strips, approximately 48 pieces',
      '1 bottle stout beer',
      '8 cloves garlic, minced',
      '2 tbsp brown sugar',
      '1 tbsp chopped, fresh rosemary',
      '1 tbsp prepared horseradish',
      '1 tsp cracked black pepper',
      '1 tsp red pepper chili flakes',
      '2 tsp kosher salt',
      '2 tbsp olive oil',
      '1 big bunch, fresh rosemary',
      '½ cup stout beer',
      '½ cup brown sugar',
      '¼ cup honey',
      '2 tbsp ketchup',
      '1 tsp Worcestershire sauce',
      '2 cloves garlic, minced',
      'Pinch kosher salt',
      'Pinch freshly ground black pepper',
      '¼ cup butter',
      '½ cup crushed salty pretzels',
    ],
    instructions: [
      'Using a sharp knife, cut the top sirloin into ½ inch thick long slices. Nice and uniform in shape so that they cook evenly. Place the strips of top sirloin into a self-sealing plastic bag. Pour in the bottle of beer, garlic, brown sugar, rosemary, horseradish, black pepper, chili flakes, salt and olive oil. Seal bag and gently mix so that the beef is evenly coated. Place in refrigerator and marinate for 2 hours.',
      'Soak wooden skewers for 1 hour in cold water.',
      'Remove beef from beer marinade, discarding leftover marinade.',
      'Thread the pieces of marinated beef onto each skewer and set them aside for 30 minutes.',
      'Take the bunches of rosemary and tie them together at one end with butcher’s twine to make yourself a rosemary basting brush. Set aside.',
      'To prepare the Stout Beer BBQ Baste, combine the beer, brown sugar, honey, ketchup, Worcestershire sauce and garlic in a small saucepot. Then season to taste with salt and pepper. Bring to a low boil and add in the butter. Remove from heat and stir until the butter is incorporated. Set aside, keeping warm.',
      'Preheat grill to medium-high, approximately 450°F–550°F (230°C–280°C).',
      'Grill beef skewers for 2-4 minutes per side rotating the skewers at least 3 times. Using the rosemary basting brush, baste liberally with the reserved Stout Beer BBQ Baste. Remove from grill Sprinkle with crushed salt pretzels and serve immediately.',
    ],
  },
  {
    cut_name: 'Petite Shoulder Filet',
    h1: 'Pan-Seared Bistro Steak with Simple Wine Sauce',
    description:
      'What makes this recipe so crave-worthy? How about a shout-out to the coveted-for-its-most-tenderness, beef tenderloin. Seared to perfection and topped with a shallot and garlic-infused wine sauce. Did we mention IT’S THE BEEF?',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2021/08/BistroSteak_knife_2web.jpg',
    ingredients: [
      '4 Beef Tenderloin Grilling Steaks, 1-inch thick',
      '½ tsp EACH salt and black pepper',
      '2 tbsp butter',
      '½ cup red wine',
      '⅓ cup beef broth',
      '¼ cup finely chopped shallots',
      '2 cloves garlic, finely chopped',
      '3 tbsp heavy/whipping or cooking cream',
      '1 tbsp butter',
    ],
    instructions: [
      'Preheat oven to 400ºF. Pat steaks dry with paper towel and season each all over with salt and pepper.',
      'Add oil to a large cast iron or heavy oven-safe skillet; heat over medium-high heat. Add steaks; cook 3 minutes or until browned, turning halfway through. Transfer pan to oven.',
      'Roast, uncovered, for 3 to 5 minutes or until an instant-read thermometer inserted sideways into steaks reads 135ºF (58ºC) for medium-rare. Transfer steaks to a plate, cover with foil and let stand while preparing pan sauce.',
      'Return skillet to medium-high heat. Add wine, broth, shallots and garlic; bring to boil, scraping up any browned bits from bottom of pan. Boil gently for 4 to 6 minutes to reduce liquid to ¼ cup. Stir in cream and continue to boil 1 minute until slightly thickened. Stir in butter until melted and sauce is thickened.',
      'Serve steaks drizzled with wine sauce.',
    ],
  },
  {
    cut_name: 'Flat Iron Steak',
    h1: 'Philly Cheese Steak Roll-Up Sliders',
    description: '',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2023/08/Flat-Iron-Philly-Cheese-Steak-Roll-Ups.png',
    ingredients: [
      '1 package (5.2 oz/150 g) garlic and fine herbs soft cheese, such as Boursin, softened (or 5 oz/150 g cream cheese)',
      '1 cup (250 mL) shredded mozzarella cheese',
      '2 tbsp (30 mL) olive oil',
      '1 onion, thinly sliced lengthwise',
      '1 sweet red pepper, cut into thin strips',
      '1 poblano or sweet green pepper, cut into thin strips',
      '1 hot or sweet banana pepper, cut into thin strips',
      '¼ cup (60 mL) grated Parmesan',
      '¼ cup (60 mL) chopped fresh dill',
      'Fresh ground pepper',
      '4 Beef Flat Iron Steaks, each about 4 oz (125 g)',
      '4 tsp (20 mL) olive oil',
      '4 tsp (20 mL) steak spice',
      '4 tsp (20 mL) Dijon mustard',
      '4 slices deli-cut Montreal smoked meat or pastrami pprox.',
      '2 mozzarella cheese strings, halved crosswise',
      'Butcher’s twine or toothpicks',
      '¼ cup (60 mL) chopped fresh dill',
      '8 rustic small rolls, split',
    ],
    instructions: [
      'Cheese Spread: Mash together softened cheese and mozzarella in a bowl. Set aside at room temperature.',
      'Sautéed Onions & Peppers: Heat oil over medium heat in a large skillet. Cook onions, stirring frequently, for 4 to 5 minutes, until tender and starting to caramelize. Add red pepper, poblano pepper and banana pepper; cook, stirring, for 2 to 3 minutes, until tender. Remove from heat and let cool.',
      'Stir in Parmesan cheese and dill; season with pepper to taste. Set aside.',
      'Steak Roll-Ups: Slice the steaks horizontally, almost but not all the way in half, to butterfly. Place 1 butterflied steak between two sheets of plastic wrap and gently pound with the flat side of a meat mallet until about ¼-inch (5 mm thick) and to stretch it a little. Repeat with remaining steaks.',
      'Brush steaks all over with olive oil and season with steak spice. Working with one steak at a time, brush surface of steak with one-quarter of the Dijon mustard. Place a slice of smoked meat (folding it if necessary) on top of the mustard. Spread 2 tbsp (30 mL) of Cheese Spread over entire surface of smoked meat.',
      'Place ¼ cup (60 mL) of Onions ‘n’ Peppers along one end of the steak. Place 1 piece of cheese string crosswise on top and press it in lightly. Starting at the end closest to the onion mixture, roll up the steak tightly into a jelly roll. Tie tightly in 1-inch (2.5 cm) intervals with butcher’s twine to secure, or hold together with toothpicks. Repeat with remaining steaks and fillings.',
      'Place on a plate, cover with food storage wrap and refrigerate for at least 1 hour or up to 8 hours. (This will allow the bundles to set/firm-up and make it easier to handle when grilling.)',
      'Grill Steak Roll-Ups in a closed preheated barbecue over medium-high heat (400°F/200C) for 10 to 12 minutes, turning to brown on all sides, or until a digital instant-read thermometer inserted in centre of each roll reads 145°F (63°C) for medium-rare at the least (or 160°F/71°C for medium, or 170°F/77°C for well-done). Transfer to a cutting board and let rest for 5 minutes.',
      'Meanwhile, grill cut sides of buns over medium-high until toasted. Spread with some of the cheese mixture and top with extra Sautéed Onions & Peppers.',
      'Cut off twine or remove toothpicks from Steak Roll-Ups and slice crosswise into three or four rounds each. Sandwich in the toasted buns.',
    ],
  },
  {
    cut_name: 'Round Roast',
    h1: 'Orange Balsamic Roast Beef and Fennel with Quinoa Pilaf',
    description:
      'Feed a crowd with a modestly priced roast beef that is loaded with flavour and perfectly tender when cooked to medium-rare and carved into thin slices. Served with a Mediterranean-inspired quinoa dish and roasted fennel bulb, you meet over all your daily needs for zinc and vitamin B12 with this one meal! This serving of beef provides 20% DV iron – heme-iron, the type that is easiest for your body to absorb. Beef also boosts the absorption of the non-heme iron from the spinach by over 150%.',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2019/03/Orange-Balsamic-Roast-Beef-800x800.jpg',
    ingredients: [
      'Roast:',
      '3 lb (1.5 kg) Beef Inside or Eye of Round Oven Roast',
      'Salt and freshly ground black pepper',
      '2 tbsp EACH olive oil grainy Dijon mustard',
      '1 tbsp balsamic vinegar',
      '2 tsp finely chopped rosemary',
      '1 tbsp orange zest',
      'Sides:',
      '1/4 cup olive oil, divided',
      '2 tbsp balsamic vinegar',
      '4 cloves garlic, minced',
      '1 tsp finely chopped rosemary',
      '1 tsp salt and freshly ground black pepper (approx.)',
      '2 shallots, thinly sliced',
      '1 small red pepper, finely chopped',
      '1 cup quinoa',
      '3 cups baby spinach',
      '1/4 cup grated Parmesan cheese',
      '2 fennel bulbs, trimmed, fronds reserved',
      '1 tsp orange zest',
    ],
    instructions: [
      'Roast: Preheat oven to 450°F (230°C). Season roast all over with salt and pepper. Whisk oil with mustard, vinegar, rosemary and orange zest. Rub all over roast. Place roast on rack in shallow roasting pan. Cook for 10 minutes or until roast is seared on the outside.',
      'Reduce temperature to 275°F (135°C). Cook for about 1 hour and 30 minutes or until meat thermometer reaches 140°F (60°C) for medium-rare. Remove from oven; cover loosely and let stand 20 minutes before slicing.',
      'Sides: Meanwhile, whisk 3 tbsp oil with vinegar, garlic, rosemary, salt and pepper. Divide into two equal portions. Set aside.',
      'Heat remaining oil in a large skillet set over medium heat. Cook shallots and red pepper for 5 minutes or until softened but not browned. Stir in quinoa until evenly coated. Add 2 cups water and one portion vinegar mixture; bring to a boil. Cover and reduce heat to medium-low. Cook for 15 minutes or until almost all the liquid has been absorbed. Stir in spinach and Parmesan. Remove from heat. Let stand, covered, for 5 minutes. Keep warm.',
      'After roast comes out of the oven, increase temperature to 425°F (220°C). Cut fennel in half, and each half into 4 wedges. Toss fennel with remaining vinegar mixture until evenly coated. Arrange, in a single layer on a parchment paper-lined baking sheet. Roast for 20 minutes or until tender-crisp and light golden brown around the edges. Toss with orange zest and fennel fronds.',
      'Carve roast into very thin slices. Drizzle with any pan juices. Serve with warm quinoa pilaf and roasted fennel.',
    ],
  },
  {
    cut_name: 'Blade Roast',
    h1: 'Slow Cooker Jerk-style Pot Roast Dinner',
    description:
      'A traditional pot roast is transformed with tropical flavours like allspice, cinnamon and coconut milk. The slow cooker and shortcut Rice & Peas method means this recipe can be a great dinner option any night of the week. Brown rice and wilted greens provide the fibre boost for this meal. This meal provides a whopping 109% of your daily zinc needs.',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2019/03/Slow-Cooker-Jerk-Beef-Pot-Roast.jpg',
    ingredients: [
      'Roast:',
      '2.5 lb (1.3 kg) Beef Pot Roast (e.g. Cross Rib, Blade or Brisket)',
      '2 tbsp jerk seasoning blend, divided',
      '1 tbsp oil',
      '1 cup no-salt added beef broth',
      '2 onions, thinly sliced',
      '3 sprigs thyme (or 1/2 tsp dried thyme leaves)',
      '2 bay leaves',
      '1 1/2 lb (750 g) carrots, scrubbed and cut on a bias into 1-inch chunks',
      '2 tbsp all-purpose flour',
      'Sides:',
      '1 can (14 oz/398 mL) lite coconut milk',
      '1/2 tsp ground allspice',
      '1/4 tsp each salt and pepper (approx.)',
      '3 cloves garlic, crushed and divided',
      '2 bay leaves',
      '1 sprig thyme (or 1/4 tsp dried thyme leaves)',
      '1 cinnamon stick',
      '1 cup brown rice',
      '1 can (19 oz/540 mL) no-salt added red kidney beans, drained and rinsed',
      '1 tbsp oil',
      '10 cups coarsely chopped kale or collard greens, ribs removed',
      'Lemon',
    ],
    instructions: [
      'Roast: Coat roast evenly with 1 tbsp jerk seasoning. Heat oil in a large Dutch oven or stock pot set over medium-high heat. Sear roast on all sides until browned. Transfer to slow cooker*. Top with onions, thyme and bay leaves. Stir remaining jerk seasoning into broth; pour over roast. Cook, on HIGH for 4 hours or on LOW for 8 hours, until fork-tender. *Alternatively, you can cook in the oven: keep roast in the Dutch oven, cover and cook in a 325°F oven for 3 hours.',
      'Toss carrots with flour and add to slow cooker (or Dutch oven) during the last 45 minutes of cooking.',
      'Sides – Rice: In a medium saucepan, combine coconut milk, 1/2 cup water, allspice, salt, pepper, 2 cloves garlic, bay leaves, thyme and cinnamon stick. Set over medium heat and bring to a boil. Stir in rice. Cook, covered, for 20 minutes or until rice is tender and liquid has been absorbed. Discard bay leaves, thyme stems (if using) and cinnamon stick. Stir in kidney beans. Let stand, covered, for 5 minutes.',
      'Sides – Greens: Heat oil with remaining garlic in a large skillet set over medium-high heat. Add greens; season with salt and pepper. Cover and cook, tossing occasionally, for 5 minutes or until wilted. Finish with a squeeze of fresh lemon juice.',
      'Serve sliced pot roast with Rice & Beans and wilted greens. Spoon sauce and carrots over roast.',
    ],
  },
  {
    cut_name: 'Tri-Tip Roast',
    h1: 'Singapore Beef Satay',
    description: '',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2017/09/Singapore-Beef-Satay-with-Rojak-Salad.jpg',
    ingredients: [
      '1 cup (125 g) peeled onion, roughly chopped',
      '1 inch (2.5 cm) peeled ginger, sliced',
      '2 garlic cloves, peeled',
      '2 Tbsp (30 mL) maple syrup (or cane sugar)',
      '1 Tbsp (15 mL) water',
      '2 tsp (6 g) ground turmeric',
      '1 tsp (3 g) ground coriander',
      '1 350-450 g piece Canadian Beef chuck tender or tri tip',
      'salt',
      'Satay Sauce:',
      '½ cup (125 g) peanut butter',
      '½ cup (125 mL) coconut milk',
      '2 Tbsp (15 mL) lime juice',
      '1 Tbsp (15 mL) maple syrup (or cane sugar)',
      'Sambal or Sambal Belacan, to taste',
    ],
    instructions: [
      'Purée the onion, ginger, garlic, maple syrup, water, turmeric and coriander in a blander until a smooth paste. Measure out 2 Tbsp (30 mL) for the satay sauce and place the rest in a flat dish.',
      'Trim the silverskin from the chuck tender (there is a little bit on each side). Cut the beef into thin strips against the grain and toss in the marinade. Cover and refrigerate for at least an hour, up to 6 hours.',
      'Prepare the peanut sauce. Heat the peanut butter, coconut milk, lime juice, maple syrup and the reserved 2 Tbsp (30 mL) of the satay marinade in a small saucepan over medium heat, whisking until smooth. Add Sambal to taste and set aside.',

      'Heat a grill or BBQ on high. Skewer the marinated beef onto soaked bamboo skewers (double up on the beef if making larger ones). Season the beef lightly with salt and grill for about 2-4 minutes to desired doneness, turning halfway through cooking.',
    ],
  },
  {
    cut_name: 'Cross-Rib Roast',
    h1: 'Slow Cooker Jerk-style Pot Roast Dinner',
    description:
      'A traditional pot roast is transformed with tropical flavours like allspice, cinnamon and coconut milk. The slow cooker and shortcut Rice & Peas method means this recipe can be a great dinner option any night of the week. Brown rice and wilted greens provide the fibre boost for this meal. This meal provides a whopping 109% of your daily zinc needs.',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2019/03/Slow-Cooker-Jerk-Beef-Pot-Roast.jpg',
    ingredients: [
      'Roast:',
      '2.5 lb (1.3 kg) Beef Pot Roast (e.g. Cross Rib, Blade or Brisket)',
      '2 tbsp jerk seasoning blend, divided',
      '1 tbsp oil',
      '1 cup no-salt added beef broth',
      '2 onions, thinly sliced',
      '3 sprigs thyme (or 1/2 tsp dried thyme leaves)',
      '2 bay leaves',
      '1 1/2 lb (750 g) carrots, scrubbed and cut on a bias into 1-inch chunks',
      '2 tbsp all-purpose flour',
      'Sides:',
      '1 can (14 oz/398 mL) lite coconut milk',
      '1/2 tsp ground allspice',
      '1/4 tsp each salt and pepper (approx.)',
      '3 cloves garlic, crushed and divided',
      '2 bay leaves',
      '1 sprig thyme (or 1/4 tsp dried thyme leaves)',
      '1 cinnamon stick',
      '1 cup brown rice',
      '1 can (19 oz/540 mL) no-salt added red kidney beans, drained and rinsed',
      '1 tbsp oil',
      '10 cups coarsely chopped kale or collard greens, ribs removed',
      'Lemon',
    ],
    instructions: [
      'Roast: Coat roast evenly with 1 tbsp jerk seasoning. Heat oil in a large Dutch oven or stock pot set over medium-high heat. Sear roast on all sides until browned. Transfer to slow cooker*. Top with onions, thyme and bay leaves. Stir remaining jerk seasoning into broth; pour over roast. Cook, on HIGH for 4 hours or on LOW for 8 hours, until fork-tender. *Alternatively, you can cook in the oven: keep roast in the Dutch oven, cover and cook in a 325°F oven for 3 hours.',
      'Toss carrots with flour and add to slow cooker (or Dutch oven) during the last 45 minutes of cooking.',
      'Sides – Rice: In a medium saucepan, combine coconut milk, 1/2 cup water, allspice, salt, pepper, 2 cloves garlic, bay leaves, thyme and cinnamon stick. Set over medium heat and bring to a boil. Stir in rice. Cook, covered, for 20 minutes or until rice is tender and liquid has been absorbed. Discard bay leaves, thyme stems (if using) and cinnamon stick. Stir in kidney beans. Let stand, covered, for 5 minutes.',
      'Sides – Greens: Heat oil with remaining garlic in a large skillet set over medium-high heat. Add greens; season with salt and pepper. Cover and cook, tossing occasionally, for 5 minutes or until wilted. Finish with a squeeze of fresh lemon juice.',
      'Serve sliced pot roast with Rice & Beans and wilted greens. Spoon sauce and carrots over roast.',
    ],
  },
  {
    cut_name: 'Shank',
    h1: 'Beef Osso Buco',
    description: '',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2023/03/Osso-BucoRT.jpg',
    ingredients: [
      '2 tbsp (30 mL) olive oil, divided',
      '4 lb (2 kg) sliced and Beef Shank, 1½ inches (4 cm) thick',
      '1 tsp (5 mL) salt',
      '1 cup (250 mL) chopped onion',
      '½ cup (125 mL) finely chopped carrot',
      '3 cloves garlic, minced',
      '1 can (19 oz/540 mL) Italian-seasoned stewed tomatoes',
      '1 cup (250 mL) dry white wine',
      '1 tsp (5 mL) dried basil leaves',
      'Gremolata',
      '1 tbsp (15 mL) chopped fresh parsley',
      '2 tsp (10 mL) grated lemon zest',
    ],
    instructions: [
      'Heat half of the oil over medium heat in a large Dutch oven or enamelled cast-iron roaster.',
      'Pat beef shanks dry with paper towel and season all over with salt.',
      'Brown, in batches, turning until browned on both sides.',
      'Transfer to a plate.',
      'Add more oil to pot between batches, as necessary.',
      'Add onion, carrot and garlic to pot; cook, stirring, for 6 to 8 minutes or until tender.',
      'Add tomatoes, wine and basil.',
      'Return beef and accumulated juices to pot and bring to a boil.',
      'Cover, reduce heat to low and cook at a constant simmer for 1½ hours or until veal is fork-tender.',
      'Gremolata: Meanwhile, combine parsley and lemon zest in a small bowl; set aside.',
      'Remove beef with a slotted spoon and transfer to a warm platter; cover to keep warm.',
      'Skim fat from sauce.',
      'Bring to a boil over high heat; boil, stirring occasionally, until sauce is slightly thickened.',
      'Spoon sauce over beef and sprinkle with Gremolata.',
    ],
  },
  {
    cut_name: 'Stewing Beef',
    h1: 'Sumptuous Stew',
    description: '',
    image_src:
      'https://thinkbeef.ca/wp-content/uploads/2017/11/Sumptuous-Stew.jpg',
    ingredients: [
      '⅓ cup all-purpose flour',
      '½ tsp EACH salt and dried thyme leaves',
      '¼ tsp EACH pepper and crushed dried rosemary leaves',
      '1 lb (500 g) Stewing Beef Cubes or Boneless Shank, Short Ribs or Simmering Steak (e.g. Blade or Cross Rib, cut into 1-inch cubes',
      '2 tbsp olive oil',
      '½ cup chopped leeks, onion or shallot',
      '1 clove garlic, minced',
      '4 cups coarsely chopped Portobello mushrooms (1 inch chunks)',
      '½ cup dry red wine',
      '2 ½ cups beef broth or stock',
      '1 tbsp tomato paste',
      'Salt and pepper to taste',
      'Easy Glazed Carrots (recipe follows)',
      'Pastry Croutons (recipe follows)',
    ],
    instructions: [
      'Combine flour, salt, thyme, pepper and rosemary in shallow bowl. Coat beef cubes lightly with flour mixture, reserving any remaining flour mixture to thicken sauce.',
      'Heat oil over medium heat in deep heavy skillet or sauté pan. Working in batches, brown beef cubes on all sides; remove from pan. Add leeks, garlic and mushrooms to pan; cook, stirring often until vegetables have softened, about 5 minutes. Gradually stir in wine, scraping up brown bits from bottom of pan. Cook until reduced by half. Stir in broth and tomato paste; bring to boil. Add browned beef and reduce heat; cover and simmer for 1 1/2 hours or until meat is tender. Remove meat from pan; keep warm.',
      'Gradually stir 3 tablespoons cold water into reserved seasoned flour mixture until smooth. Gradually whisk into bubbling sauce. Cook and stir until sauce thickens. Season with salt and pepper; add beef back to pan to coat with sauce. Serve with Easy Glazed Carrots and Pastry Croutons.',
      'Glazed Carrots: In large skillet, add 4 cups diagonally sliced or mini carrots (about 1 lb/500g) and ¼ cup EACH water and orange juice, and 2 tbsp liquid honey. Bring to boil; reduce heat to medium. Cover and cook until carrots are tender, about 10 minutes. Uncover and continue to cook about 2 minutes, until liquid has evaporated. Add 2 tbsp butter, 1 tbsp minced fresh chives or parsley and salt and pepper to taste. Toss gently to melt butter and coat.',
      'Puff Pastry Croutons: Roll out half a (397 g) package, defrosted purchased puff pastry to ¼ inch thick. Place pastry on parchment lined baking sheet and brush with cream. Using a knife, score pastry into crouton-sized shapes. Bake in 400°F (200°C) oven for 15 minutes or until pastry is puffed and golden.Per serving based on 6 servings (66 g cooked beef per serving): 757 calories, fat 40.7 g, sodium 889 mg, carbohydrate 58.2 g, fibre 6 g, sugars 16.1 g, protein 35.9 g. %DV: zinc 89%, iron 44%, vitamin B12 265%, calcium 6% DV',
    ],
  },
  {
    cut_name: 'Ground Beef',
    h1: 'Mayai Mani (Beef and Egg Casserole)',
    description:
      'This Mayai Mani casserole is quick to pull together with just a few basic ingredients and is reminiscent of Mexican Heuovos Rancheros.',
    image_src: 'https://thinkbeef.ca/wp-content/uploads/2017/07/Mayai-Mani.jpg',
    ingredients: [
      '1 pound Ground Beef',
      '1 small onion, chopped',
      '2 tomatoes, chopped',
      '1 ½ tsp tomato paste',
      '1 tsp EACH minced garlic and fresh gingerroot',
      '1 tsp ground cumin',
      '½ tsp turmeric',
      '1 tbsp lemon juice',
      'Salt',
      'Cilantro',
      'Dried parsley',
      'Paprika',
      '4 eggs',
    ],
    instructions: [
      'Cook the ground beef in large nonstick pan over medium heat.',
      'When the meat is partially cooked, add the onion, tomatoes and spices; continue cooking until the meat is completely cooked and any liquid has evaporated. Add lemon juice and season with salt to taste. Add a handful of chopped cilantro to the ground beef; remove from heat and set aside.',
      'Grease an 8” x 8” glass baking dish.',
      'Add the ground beef mixture.',
      'Make four indentations, evenly spaced in the ground beef. Add one of four eggs into each depression. Sprinkle with dried parsley and paprika.',
      'Bake in a 350˚F oven for 20 minutes or until the eggs have cooked.',
      'Serve with bread or naan.',
    ],
  },
];

const RecipeBook = () => {
  const uniqueRecipes = recipes.filter(
    (recipe, index, self) =>
      index === self.findIndex((t) => t.h1 === recipe.h1),
  );
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Helper function to generate a URL-friendly ID from a recipe title
  const generateId = (title: string) =>
    title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  // Group recipes by cut_name for the navigation menus.
  const groupedRecipes = useMemo(() => {
    return recipes.reduce<Record<string, typeof recipes>>((acc, recipe) => {
      const cut = recipe.cut_name;
      if (!acc[cut]) {
        acc[cut] = [];
      }
      acc[cut].push(recipe);
      return acc;
    }, {});
  }, []);

  // Effect to show/hide the "Back to Top" button based on scroll position
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showBackToTop && window.scrollY > 400) {
        setShowBackToTop(true);
      } else if (showBackToTop && window.scrollY <= 400) {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showBackToTop]);

  // Function to smoothly scroll to the top of the page
  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-stone-50 text-stone-800 font-sans antialiased">
      <div
        id="page-top"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* --- Introductory Text Section --- */}
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl  text-stone-900 mb-6">
            Cooking Grassfed Beef
          </h1>
          <div className="text-left text-stone-600 space-y-4">
            <p>
              Avoid overcooking, grass finished beef is leaner than
              grain-finished beef so it is more susceptible to overcooking. This
              beef is best when rare to medium rare. If you like well done beef,
              cook your grass finished beef at very low temperatures in a sauce
              to add moisture.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Never use a fork to turn your beef. . . precious juices will be
                lost. Always use tongs.
              </li>
              <li>
                Let the beef sit covered and in a warm place for 8 to 10 minutes
                after removing from heat to let the juices redistribute.
              </li>
              <li>
                Grass finished beef has high protein and low fat levels. The
                beef will usually require 30% less cooking time and will
                continue to cook when removed from heat. For this reason, remove
                the beef from your heat source 10 degrees before it reaches the
                desired temperature.
              </li>
              <li>
                Always pre-heat your oven, pan or grill before cooking grass
                finished beef.
              </li>
              <li>
                <strong>Marinating</strong> is recommended especially for lean
                cuts like NY Strip and Sirloin Steak. Choose a recipe that doesn
                {"'"}t mask the delicate flavor of grass finished beef but
                enhances the moisture content. A favorite marinade using lemon,
                vinegar, wine, beer or bourbon is a great choice. Another option
                is a favourite Italian salad dressing.
              </li>
            </ul>
            <p className="pt-4">
              Not sure how to cook that new cut of meat that in your bundle?
              Take a look at the recipes below for some inspirations. Thanks to{' '}
              <a
                className="underline hover:text-blue-700"
                href="https://thinkbeef.ca/"
              >
                Think Beef
              </a>{' '}
              for making them available! Just note that these are not specific
              to grassfed beef, so you may need to adjust the cooking times.
            </p>
          </div>
        </header>

        <hr className="mb-16 border-stone-200" />

        {/* --- IMPROVED: Table of Contents --- */}
        <section id="recipe-index-top" className="mb-20 max-w-2xl mx-auto">
          <h2 className="text-3xl  font-display text-center mb-8">
            Recipe Table of Contents
          </h2>
          <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
            {Object.keys(groupedRecipes).map((cutName) => (
              <div key={cutName}>
                <h3
                  id={generateId(cutName)}
                  className=" text-stone-900 capitalize text-xl mb-3 pb-2"
                >
                  {cutName}
                </h3>
                <ul className="space-y-3 list-none pl-4">
                  {groupedRecipes[cutName].map((recipe) => (
                    <li key={recipe.h1}>
                      <Link
                        to={`#${generateId(recipe.h1)}`}
                        preventScrollReset
                        className="text-stone-600 hover:text-stone-900 hover:underline transition-colors duration-200"
                      >
                        {recipe.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- Main Content Layout --- */}
        <div className="max-w-4xl mx-auto">
          {/* --- Recipe Details Section --- */}
          <main>
            <div className="space-y-20">
              {uniqueRecipes.map((recipe) => (
                <article
                  key={recipe.h1}
                  id={generateId(recipe.h1)}
                  className="bg-white p-6 sm:p-8 rounded-lg shadow-lg scroll-mt-24"
                >
                  <img
                    src={recipe.image_src}
                    alt={recipe.h1}
                    className="w-full h-64 object-cover rounded-md mb-6"
                  />
                  <h2 className="text-3xl  font-display text-stone-900 mb-4">
                    {recipe.h1}
                  </h2>
                  {recipe.description && (
                    <p className="text-stone-600 mb-6 italic">
                      {recipe.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <h3 className="text-xl font-semibold mb-3 border-b border-stone-200 pb-2">
                        Ingredients
                      </h3>
                      <ul className="space-y-2 text-stone-700 list-disc list-inside">
                        {recipe.ingredients.map((item, index) => (
                          <li key={index}>{item.trim()}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-semibold mb-3 border-b border-stone-200 pb-2">
                        Instructions
                      </h3>
                      <ol className="space-y-4 text-stone-700 list-decimal list-inside">
                        {recipe.instructions.map((step, index) => (
                          <li key={index} className="pl-2">
                            {step.trim()}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="text-right mt-8 pt-4 border-t border-stone-100">
                    <Link
                      to="#page-top"
                      onClick={(e) =>
                        scrollToTop(
                          e as unknown as React.MouseEvent<HTMLButtonElement>,
                        )
                      }
                      preventScrollReset
                      className="text-sm font-semibold text-stone-600 hover:text-stone-900 hover:underline transition-colors"
                    >
                      Back to Top &uarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-stone-800 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-stone-700 transition-all duration-300 z-50"
          aria-label="Go to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default RecipeBook;
