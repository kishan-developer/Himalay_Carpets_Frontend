import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Ensure the translate widget is initialized if script already loaded
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    }
  }, []);

  return (
    <div id="google_translate_element" ></div>
  );
};

export default GoogleTranslate;
