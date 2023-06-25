export interface Service {

    init: () => Promise<void>;
    start: () => Promise<void>;
    stop: () => Promise<void>;

}