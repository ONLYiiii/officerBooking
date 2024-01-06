import { createI18n } from "vue-i18n";
import { th } from "vuetify/locale";

function customMessages() {
  let messages = {
    th: {
      $vuetify: {
        ...th,
      },
    },
  };

  messages.th.$vuetify.datePicker.header = "เลือกวันที่";
  messages.th.$vuetify.datePicker.title = `พ.ศ.${
    new Date().getFullYear() + 543
  }`;

  return messages;
}

export const i18n = createI18n({
  legacy: false,
  locale: "th",
  fallbackLocale: "en",
  messages: customMessages(),
});
