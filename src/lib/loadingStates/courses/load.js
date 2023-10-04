import { writable } from "svelte/store";
import { LoadingState } from "../constants";

export const loading = writable(LoadingState.LOADING);