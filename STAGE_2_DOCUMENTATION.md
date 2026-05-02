What I Made
I built a website using Next.js and Material UI that helps students see important college updates. It shows everything from job placements to exam results in an easy-to-read list.

The Different Pages
1. Welcome Page
This is the first thing you see. It explains what the site is for and has buttons to take you to the full list or the most important updates. The page is centered and looks clean, with two big cards side-by-side that lead you to either view all notifications or just the top priority ones.

2. The Main List
This page shows every single notification.

Filters: You can click a button to see only "Placements" or only "Events."

Pages: It only shows 10 items at a time so it doesn't look messy.

Badges: If a notification is new, it has a bright "NEW" tag on it.

Colors: I used colors to show what's important. Red is for jobs (High), Orange is for results (Medium), and Blue is for general events (Low).

3. The "Must-See" Page
This is a special page just for the top priority items.

It automatically puts Job Placements at the very top.

You can choose if you want to see the top 5, 10, or even 50 items.

Cool Features I Added
Read vs. Unread: You can click a button to "Mark as Read." Once you click it, the "NEW" tag goes away and the color gets a bit lighter so you know you've seen it.

Phone Friendly: The website looks good on my laptop, but I also made sure it works perfectly on a phone screen. The text sizes shrink, buttons get closer together, and cards stack nicely. Everything is touchable and readable on mobile devices.

Easy Navigation: I added a bar at the top of every page so you can jump back and forth easily.

Smooth Card Design: The notification cards have cool hover effects. When you hover over a card, it lifts up slightly and the shadow gets bigger. This makes the interface feel responsive and modern.

Smart Error Handling: If something goes wrong with your session (like your token expires), instead of the app breaking, you'll see a friendly red alert message telling you what happened. The app logs these errors too, so the system knows what went wrong.

Numbered Rankings: On the "Must-See" page, the top priorities are numbered (1, 2, 3...) with color-coded badges matching their priority level. This makes it super easy to see which notification matters most.

Technical Stuff
Tools Used: Next.js and Material UI. I didn't use any other fancy CSS libraries like ShadCN because the rules said not to.

API: I connected to the college server and used special links (query params) to ask for specific things, like "only give me page 2" or "only show placements."

Where it runs: It runs on localhost:3000.

Folder Setup
I kept my code very organized. I put the main pages in an app folder and made a separate components folder for things I used more than once, like the notification cards.


### sample env
NEXT_PUBLIC_CLIENT_ID\
NEXT_PUBLIC_CLIENT_SECRET
NEXT_PUBLIC_AUTH_TOKEN
NEXT_PUBLIC_LOG_API
NEXT_PUBLIC_API_URL