import { ConvexHttpClient } from 'convex/browser';
import { api as _api } from '../../../convex/_generated/api';

export const client = new ConvexHttpClient(
    import.meta.env.VITE_CONVEX_URL || 'http://localhost:8080/api'
);

export const api = _api;
