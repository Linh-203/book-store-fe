export const paramTransformer = (raw: Record<string, boolean | string | number | undefined>) => {
   if (typeof raw === 'object' && !Array.isArray(raw)) {
      const rawConverted = { ...raw };
      for (const key in raw) {
         const keyConverted = `_${key}`;
         if (keyConverted && rawConverted) {
            rawConverted[keyConverted] = rawConverted[key];
            rawConverted[key] = undefined;
         }
      }

      console.log(raw); 
      return rawConverted;
   }

   return raw;
};
