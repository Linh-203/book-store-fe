/** @type {import('tailwindcss').Config}
 * */ export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   important: true,
   theme: {
      extend: { colors: { greenPrimary: '#00ab9f' } },
      screens: {
         sm: '479px',
         'max-sm': { max: '479px' },
         md: '767px',
         'max-md': { max: '767px' },
         lg: '991px',
         'max-lg': { max: '991px' },
         xl: '1199px',
         'max-xl': { max: '1199px' },
         '2xl': '1536px',
         'max-2xl': { max: '1536px' }
      }
   },
   plugins: []
};
