import { createContext, Dispatch, SetStateAction, useState } from 'react';
interface SearchContextType {
   searchTerm: string;
   setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType>({
   searchTerm: '',
   setSearchTerm: () => {}
});

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
   const [searchTerm, setSearchTerm] = useState('');

   return <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>{children}</SearchContext.Provider>;
};

export { SearchContext, SearchProvider };
