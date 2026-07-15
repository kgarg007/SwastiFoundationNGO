const mongoose = require('mongoose');
const { Schema } = mongoose;

const settingsSchema = new Schema({
  orgInfo: {
    name: { type: String, default: "Swasti Foundation" },
    tagline: { type: String, default: "नर सेवा ही नारायण सेवा है।" },
    taglineTranslation: { type: String, default: "Service to mankind is service to the divine." },
    foundedDate: { type: String, default: "2020-02-25" },
    foundedYear: { type: Number, default: 2020 },
    registrationNumber: { type: String, default: "DL/2020/341" },
    type: { type: String, default: "Trust" },
    officeAddress: { type: String, default: "H.No. 260/4, Main Road, Chhattarpur, New Delhi 110074" },
    correspondenceAddress: { type: String, default: "H.No. 167, Rajpur Khurd Extension, South Delhi 110068" },
    branchLocations: { type: [String], default: ["Karol Bagh", "Rajpur", "Chhattarpur"] },
    email: { type: String, default: "Foundationswasti@gmail.com" },
    phone: { type: String, default: "8459073474" },
    whatsappNumber: { type: String, default: "459073474" },
    social: {
      facebook: { type: String, default: "#" },
      instagram: { type: String, default: "#" },
      youtube: { type: String, default: "#" }
    }
  },
  aboutContent: {
    whyFounded: { type: String, default: "" },
    problem: { type: String, default: "" },
    founderStory: { type: String, default: "" },
    inspiration: { type: String, default: "" },
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },
    visionExtended: { type: String, default: "" },
    coreValues: [{
      id: String,
      name: String,
      description: String
    }]
  },
  founderMessage: {
    founderName: { type: String, default: "Shailesh Shastri" },
    founderTitle: { type: String, default: "Founder, Swasti Foundation" },
    letter: { type: [String], default: [] },
    closing: { type: String, default: "With sincere regards," }
  },
  impactStats: {
    type: [{
      id: { type: String, required: true },
      value: { type: Number, required: true },
      suffix: { type: String, default: "+" },
      label: { type: String, required: true }
    }],
    default: [
      { id: "children-educated", value: 5000, suffix: "+", label: "Children Educated" },
      { id: "ration-distributed", value: 20000, suffix: "+", label: "Ration Distributed" },
      { id: "states-reached", value: 10, suffix: "+", label: "States Reached" },
      { id: "cleanliness-kits", value: 10000, suffix: "+", label: "Cleanliness Kits Distributed" }
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
