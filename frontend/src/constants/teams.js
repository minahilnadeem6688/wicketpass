// Franchise colours, softened to sit on the paper background
export const TEAMS = {
  kk: { code:"KK",  name:"Karachi Kings",      city:"Karachi",    color:"#2B5BA8", ink:"#FFFFFF" },
  lq: { code:"LQ",  name:"Lahore Qalandars",   city:"Lahore",     color:"#2E7D4F", ink:"#FFFFFF" },
  pz: { code:"PZ",  name:"Peshawar Zalmi",     city:"Peshawar",   color:"#E9B21B", ink:"#15241D" },
  qg: { code:"QG",  name:"Quetta Gladiators",  city:"Quetta",     color:"#6A3F97", ink:"#FFFFFF" },
  iu: { code:"IU",  name:"Islamabad United",   city:"Islamabad",  color:"#D2383B", ink:"#FFFFFF" },
  ms: { code:"MS",  name:"Multan Sultans",     city:"Multan",     color:"#138A7E", ink:"#FFFFFF" },
  hk: { code:"HK",  name:"Hyderabad Kingsmen", city:"Hyderabad",  color:"#E0712E", ink:"#FFFFFF" },
  rp: { code:"RP",  name:"Rawalpindiz",        city:"Rawalpindi", color:"#8C2C4A", ink:"#FFFFFF" },
}

const BY_NAME = Object.fromEntries(Object.values(TEAMS).map(t => [t.name.toLowerCase(), t]))
const BY_CITY = Object.fromEntries(Object.values(TEAMS).map(t => [t.city.toLowerCase(), t]))

// Accepts "Karachi Kings", "Karachi" or a code like "kk"
export function team(nameOrCode = "") {
  const k = String(nameOrCode).trim().toLowerCase()
  return TEAMS[k] || BY_NAME[k] || BY_CITY[k] || BY_CITY[k.split(" ")[0]] ||
    { code: k.slice(0, 2).toUpperCase() || "WP", name: nameOrCode, city: nameOrCode, color:"#1D4636", ink:"#FFFFFF" }
}

// "Karachi Kings vs Lahore Qalandars" or "Karachi vs Lahore" -> [team, team]
export function splitMatch(label = "") {
  const [a = "", b = ""] = String(label).split(/\s+vs\.?\s+/i)
  return [team(a), team(b)]
}
