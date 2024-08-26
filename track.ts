export interface Root {
    href: string
    items: Track[]
    limit: number
    next: string
    offset: number
    previous: any
    total: number
}
export interface Track {
    id: string;
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
