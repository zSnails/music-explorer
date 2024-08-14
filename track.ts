export interface Track {
    name: string;
    album: Album;
    duration_ms: number;
    explicit: boolean;
    release_date: string;
    external_urls: ExternalUrls;
    track_number?: number
}

export interface Album {
    name: string;
    release_date: string;
    images: Image[];
    total_tracks: number;
    external_urls: ExternalUrls;
    id: string;
};

export interface ExternalUrls {
    spotify: string;
};

export interface Image {
    url: string;
    height: number;
    width: number;
}
