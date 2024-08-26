export interface Root {
    collaborative: boolean
    description: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    name: string
    owner: Owner
    public: boolean
    snapshot_id: string
    tracks: Tracks
    type: string
    uri: string
}

export interface ExternalUrls {
    spotify: string
}

export interface Followers {
    href: string
    total: number
}

export interface Image {
    url: string
    height: number
    width: number
}

export interface Owner {
    external_urls: ExternalUrls2
    followers: Followers2
    href: string
    id: string
    type: string
    uri: string
    display_name: string
}

export interface ExternalUrls2 {
    spotify: string
}

export interface Followers2 {
    href: string
    total: number
}

export interface Tracks {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: Item[]
}

export interface Item {
    added_at: string
    added_by: AddedBy
    is_local: boolean
    track: Track
}

export interface AddedBy {
    external_urls: ExternalUrls3
    followers: Followers3
    href: string
    id: string
    type: string
    uri: string
}

export interface ExternalUrls3 {
    spotify: string
}

export interface Followers3 {
    href: string
    total: number
}

export interface Track {
    album: Album
    artists: Artist2[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIds
    external_urls: ExternalUrls7
    href: string
    id: string
    is_playable: boolean
    linked_from: LinkedFrom
    restrictions: Restrictions2
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
    is_local: boolean
}

export interface Album {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrls4
    href: string
    id: string
    images: Image2[]
    name: string
    release_date: string
    release_date_precision: string
    restrictions: Restrictions
    type: string
    uri: string
    artists: Artist[]
}

export interface ExternalUrls4 {
    spotify: string
}

export interface Image2 {
    url: string
    height: number
    width: number
}

export interface Restrictions {
    reason: string
}

export interface Artist {
    external_urls: ExternalUrls5
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface ExternalUrls5 {
    spotify: string
}

export interface Artist2 {
    external_urls: ExternalUrls6
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface ExternalUrls6 {
    spotify: string
}

export interface ExternalIds {
    isrc: string
    ean: string
    upc: string
}

export interface ExternalUrls7 {
    spotify: string
}

export interface LinkedFrom { }

export interface Restrictions2 {
    reason: string
}
