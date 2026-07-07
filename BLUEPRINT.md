# Code Talent Redesign Blueprint

## Objective

Build a premium, high-conversion redesign for Code Talent that preserves the existing site's factual content while upgrading the strategy, content hierarchy, credibility, and visual execution.

## Source Site Coverage

Public and discovered source routes crawled:

- `/`
- `/about`
- `/services`
- `/team`
- `/meetups`
- `/blog`
- `/blog/first-call--big-stakes--how-to-nail-your-initial-interview`
- `/blog/interview-prep-guide-for-software-engineers`
- `/contact-us`
- `/privacy-policy`
- `/candidate`
- `/candidate-intake`
- Individual staff/profile pages: `/matt`, `/rita`, `/riley`, `/conor`, `/bret`, `/eric`, `/kevin`, `/justin`, `/nick`, `/sisson`

## Preserved Facts

- Brand: `code.`
- Core line: "Connecting standout people with standout teams."
- Based in Denver, Colorado.
- Specializes in talent acquisition for modern technology companies, from early-stage startups to billion-dollar pre-IPO unicorns.
- Mission: true partner to the Colorado entrepreneurial community.
- Differentiators: talent-first approach, community involvement, experience and representation, flexible contingency-based fee model.
- Community: supported Colorado tech community since founding; co-chairing Denver Startup Week Product and Developer tracks since 2013.
- Services: contingency hiring, executive search, contract-to-hire, contract services.
- Roles: engineering, engineering leadership, data, infrastructure, QA, product, UI/UX, enterprise software, finance/accounting, customer success, sales/marketing, operations.
- Industries: clean/green energy, healthtech, AI, aerospace, climate tech, telecom, edtech, B-corps, SaaS, IoT.
- Stages: seed/pre-seed, hyper-growth mid/late stage, post-IPO, private equity, enterprise.
- Partner/company examples: Guild Education, Ibotta, MagicSchool, Beatport, UpLight, GoSpotCheck, CirrusMD, Wunder Capital, Notion, Brandfolder.
- Team: Rita Povlich, Heidi Harvey, Nick Sisson, Justin Cosmano, Riley Scardina, Bret Smith, Nick Gasparro, Eric Hernandez, Kevin Doran, Conor Swanson.
- Available emails from profile pages: rita@code-talent.com, riley@code-talent.com, nsisson@code-talent.com, nick@code-talent.com, support@code-talent.com.
- Community groups: AI Tinkerers, Black Tech Denver, CocoaHeads Denver, Colorado Product Foundation, Denver Data Engineers, Denver DevOps, Denver Elixir Meetup, Denver Leadership Meetup, Denver Microservices Meetup, Denver Python Meetup, Denverscript Meetup, Denver Startup Week, HighView Sessions, MLOps Meetup, Mile High Gophers, Paired Community, React Meetup, The R Meetup, Test Tribe QA Meetup, Women in Product, Vue Meetup.
- Blog posts: "Interview Prep Guide for Software Engineers" by Riley Scardina, May 8, 2023; "First Call, Big Stakes: How to Nail Your Initial Interview" by Conor Swanson, Jun 19, 2025.

## Strategy Changes

1. Make the homepage carry the full story instead of forcing users into secondary pages.
2. Split employer and candidate journeys early.
3. Upgrade testimonials and community involvement into primary proof assets.
4. Turn the team roster from stubs into credibility cards while flagging bios/headshots as needed.
5. Use real imagery and a refined visual system: monochrome, indigo, warm off-white, and one deep ink section.
6. Add process clarity: intake, map, curate, close.
7. Add owner-decision placeholders where private details are missing: exact address, phone, LinkedIn URL, confirmed metrics, full team bios.

## Recommended Final Routes

- `/` - homepage
- `/employers` - employer conversion page
- `/talent` - candidate page
- `/services` - services detail
- `/community` - meetups and local involvement
- `/team` - team grid
- `/insights` - blog and guides
- `/contact` - intent-routed contact
- `/privacy` - privacy policy

## Prototype Build Scope

The first build will be a high-fidelity static prototype in `site/`:

- Single-page premium homepage with anchor navigation representing all core pages.
- Separate privacy block included near footer.
- Static contact form UI only; no backend submission until owner provides routing details.
- Real public source imagery referenced remotely where useful.
- Source content rewritten and structured to avoid long verbatim copying, except names, facts, labels, service names, and short testimonial snippets.

## Hard Blockers Before Production

- Confirm Code Talent owns or may reuse all Durable/CDN/Getty/source-site images and client logos.
- Confirm exact public office address, phone, LinkedIn, and general email.
- Confirm metrics before publishing stats beyond "since 2013", "over a decade", and the meetup count.
- Confirm team roster, titles, headshots, bios, and current emails.
- Confirm testimonial/logo reuse rights.
