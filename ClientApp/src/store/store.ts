import { getDefaultMiddleware, compose, configureStore } from "redux-starter-kit";
import logger from "redux-logger";
import { mod } from "./module";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

export const setupStore = () => {
    const middleware = [ ...getDefaultMiddleware() ];
    
    if (process.env.NODE_ENV === "development") {
        middleware.push(logger);
    }

    const persistConfig = {
        key: "store",
        storage,
    };

    const store = configureStore({
        reducer: persistReducer(persistConfig, mod.reducer),
    });

    const persistor = persistStore(store);

    return { store, persistor };
};