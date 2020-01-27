import React, { useEffect, useCallback, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    Image,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import Timeline from '../components/Timeline'
const { width, height } = Dimensions.get('window')

const Itineraries = {
    location: {
        name: "Bandung",
        lat: -6.903429,
        lng: 107.5030708
    },
    date: {
        start: "2020-01-19T17:00:00.000Z",
        end: "2020-01-21T17:00:00.000Z",
        total_days: 2
    },
    activities: [
        {
            _id: "5e2b59d896caab340f12b1e5",
            date: "2020-10-20T00:00:00.000Z",
            places: [
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e9",
                            height: 3480,
                            photo_reference: "CmRaAAAAUXhEeW3XGl6ihQVqd2uoIft81JL4HkszdFTM-YrB_OF9J86DR4UT7I61LPEoYfksNBznCIUr9hTomnC8bVl-L42xQH0u_DQ2CcaAs8rs60PRQDi1hgiB9Q_IWz_H87VXEhCySA0_A3sxxuvKgF_1fF26GhRVMiMcy46_6KzEI_pnfClTH7Ft6w&key=API_KEY",
                            width: 4640
                        }
                    ],
                    time: '10:45',
                    _id: "5e2b59d896caab340f12b1e8",
                    status: false,
                    order: 2,
                    formatted_address: "Jl. Dewisita No.10, Banjar Padang, Tegal, Kabupaten Gianyar, Bali 80571, Indonesia",
                    lat: -8.5101692,
                    lng: 115.2635134,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "dec40100516b3d695ee816b81a7606d74791c9f3",
                    title: "Restaurant Locavore",
                    price_level: 4,
                    rating: 4.5,
                    user_ratings_total: 620
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e7",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '12:00',
                    _id: "5e2b59d896caab340f12b1e6",
                    status: false,
                    order: 3,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e9",
                            height: 3480,
                            photo_reference: "CmRaAAAAUXhEeW3XGl6ihQVqd2uoIft81JL4HkszdFTM-YrB_OF9J86DR4UT7I61LPEoYfksNBznCIUr9hTomnC8bVl-L42xQH0u_DQ2CcaAs8rs60PRQDi1hgiB9Q_IWz_H87VXEhCySA0_A3sxxuvKgF_1fF26GhRVMiMcy46_6KzEI_pnfClTH7Ft6w&key=API_KEY",
                            width: 4640
                        }
                    ],
                    time: '10:45',
                    _id: "5e2b59d896caab340f12b1e8",
                    status: false,
                    order: 2,
                    formatted_address: "Jl. Dewisita No.10, Banjar Padang, Tegal, Kabupaten Gianyar, Bali 80571, Indonesia",
                    lat: -8.5101692,
                    lng: 115.2635134,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "dec40100516b3d695ee816b81a7606d74791c9f3",
                    title: "Restaurant Locavore",
                    price_level: 4,
                    rating: 4.5,
                    user_ratings_total: 620
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e7",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '12:00',
                    _id: "5e2b59d896caab340f12b1e6",
                    status: false,
                    order: 3,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                }
            ],
            __v: 0
        }, {
            _id: "5e2b59d896caab340f12b1e5",
            date: "2020-10-20T00:00:00.000Z",
            places: [
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e9",
                            height: 3480,
                            photo_reference: "CmRaAAAAUXhEeW3XGl6ihQVqd2uoIft81JL4HkszdFTM-YrB_OF9J86DR4UT7I61LPEoYfksNBznCIUr9hTomnC8bVl-L42xQH0u_DQ2CcaAs8rs60PRQDi1hgiB9Q_IWz_H87VXEhCySA0_A3sxxuvKgF_1fF26GhRVMiMcy46_6KzEI_pnfClTH7Ft6w",
                            width: 4640
                        }
                    ],
                    time: '10:45',
                    _id: "5e2b59d896caab340f12b1e8",
                    status: false,
                    order: 2,
                    formatted_address: "Jl. Dewisita No.10, Banjar Padang, Tegal, Kabupaten Gianyar, Bali 80571, Indonesia",
                    lat: -8.5101692,
                    lng: 115.2635134,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "dec40100516b3d695ee816b81a7606d74791c9f3",
                    title: "Restaurant Locavore",
                    price_level: 4,
                    rating: 4.5,
                    user_ratings_total: 620
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e7",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '12:00',
                    _id: "5e2b59d896caab340f12b1e6",
                    status: false,
                    order: 3,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                }
            ],
            __v: 0
        }, {
            _id: "5e2b59d896caab340f12b1e5",
            date: "2020-10-20T00:00:00.000Z",
            places: [
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e9",
                            height: 3480,
                            photo_reference: "CmRaAAAAUXhEeW3XGl6ihQVqd2uoIft81JL4HkszdFTM-YrB_OF9J86DR4UT7I61LPEoYfksNBznCIUr9hTomnC8bVl-L42xQH0u_DQ2CcaAs8rs60PRQDi1hgiB9Q_IWz_H87VXEhCySA0_A3sxxuvKgF_1fF26GhRVMiMcy46_6KzEI_pnfClTH7Ft6w",
                            width: 4640
                        }
                    ],
                    time: '10:45',
                    _id: "5e2b59d896caab340f12b1e8",
                    status: false,
                    order: 2,
                    formatted_address: "Jl. Dewisita No.10, Banjar Padang, Tegal, Kabupaten Gianyar, Bali 80571, Indonesia",
                    lat: -8.5101692,
                    lng: 115.2635134,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "dec40100516b3d695ee816b81a7606d74791c9f3",
                    title: "Restaurant Locavore",
                    price_level: 4,
                    rating: 4.5,
                    user_ratings_total: 620
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e7",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '12:00',
                    _id: "5e2b59d896caab340f12b1e6",
                    status: false,
                    order: 3,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                }
            ],
            __v: 0
        }, {
            _id: "5e2b59d896caab340f12b1e5",
            date: "2020-10-20T00:00:00.000Z",
            places: [
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e9",
                            height: 3480,
                            photo_reference: "CmRaAAAAUXhEeW3XGl6ihQVqd2uoIft81JL4HkszdFTM-YrB_OF9J86DR4UT7I61LPEoYfksNBznCIUr9hTomnC8bVl-L42xQH0u_DQ2CcaAs8rs60PRQDi1hgiB9Q_IWz_H87VXEhCySA0_A3sxxuvKgF_1fF26GhRVMiMcy46_6KzEI_pnfClTH7Ft6w",
                            width: 4640
                        }
                    ],
                    time: '10:45',
                    _id: "5e2b59d896caab340f12b1e8",
                    status: false,
                    order: 2,
                    formatted_address: "Jl. Dewisita No.10, Banjar Padang, Tegal, Kabupaten Gianyar, Bali 80571, Indonesia",
                    lat: -8.5101692,
                    lng: 115.2635134,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "dec40100516b3d695ee816b81a7606d74791c9f3",
                    title: "Restaurant Locavore",
                    price_level: 4,
                    rating: 4.5,
                    user_ratings_total: 620
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e7",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '12:00',
                    _id: "5e2b59d896caab340f12b1e6",
                    status: false,
                    order: 3,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                }
            ],
            __v: 0
        }, {
            _id: "5e2b59d896caab340f12b1e5",
            date: "2020-10-20T00:00:00.000Z",
            places: [
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e9",
                            height: 3480,
                            photo_reference: "CmRaAAAAUXhEeW3XGl6ihQVqd2uoIft81JL4HkszdFTM-YrB_OF9J86DR4UT7I61LPEoYfksNBznCIUr9hTomnC8bVl-L42xQH0u_DQ2CcaAs8rs60PRQDi1hgiB9Q_IWz_H87VXEhCySA0_A3sxxuvKgF_1fF26GhRVMiMcy46_6KzEI_pnfClTH7Ft6w",
                            width: 4640
                        }
                    ],
                    time: '10:45',
                    _id: "5e2b59d896caab340f12b1e8",
                    status: false,
                    order: 2,
                    formatted_address: "Jl. Dewisita No.10, Banjar Padang, Tegal, Kabupaten Gianyar, Bali 80571, Indonesia",
                    lat: -8.5101692,
                    lng: 115.2635134,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "dec40100516b3d695ee816b81a7606d74791c9f3",
                    title: "Restaurant Locavore",
                    price_level: 4,
                    rating: 4.5,
                    user_ratings_total: 620
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e7",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '12:00',
                    _id: "5e2b59d896caab340f12b1e6",
                    status: false,
                    order: 3,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                }
            ],
            __v: 0
        },
        {
            _id: "5e2b59d896caab340f12b1e5",
            date: "2020-10-20T00:00:00.000Z",
            places: [
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e9",
                            height: 3480,
                            photo_reference: "CmRaAAAAUXhEeW3XGl6ihQVqd2uoIft81JL4HkszdFTM-YrB_OF9J86DR4UT7I61LPEoYfksNBznCIUr9hTomnC8bVl-L42xQH0u_DQ2CcaAs8rs60PRQDi1hgiB9Q_IWz_H87VXEhCySA0_A3sxxuvKgF_1fF26GhRVMiMcy46_6KzEI_pnfClTH7Ft6w",
                            width: 4640
                        }
                    ],
                    time: '10:45',
                    _id: "5e2b59d896caab340f12b1e8",
                    status: false,
                    order: 2,
                    formatted_address: "Jl. Dewisita No.10, Banjar Padang, Tegal, Kabupaten Gianyar, Bali 80571, Indonesia",
                    lat: -8.5101692,
                    lng: 115.2635134,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "dec40100516b3d695ee816b81a7606d74791c9f3",
                    title: "Restaurant Locavore",
                    price_level: 4,
                    rating: 4.5,
                    user_ratings_total: 620
                },
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1e7",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '12:00',
                    _id: "5e2b59d896caab340f12b1e6",
                    status: false,
                    order: 3,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                }
            ],
            __v: 0
        }
    ],
    reviews: [
        "5e2ad8c86722641dfa880cff"
    ],
    _id: "5e2ad7de751f171deef9db9f",
    name: "My Awesome Trip",
    user_id: "5e2ab24285fb6f17f71f4d73",
    __v: 0
}

export default function Itinerary(props) {

    const [itinerary, setItinerary] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [itinDetail, setItinDetail] = useState([]);

    const fetchData = () => {
        setLoading(true)
        setItinerary(Itineraries)
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
        setItinerary(Itineraries)
        setItinDetail(Itineraries.activities[0].places)
    }, [Itineraries]);

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(1500).then(() => {
            fetchData();
            setRefresh(false);
        });
    }, [refresh]);

    const changedDay = (index) => {
        // console.log(index)
        setLoading(true)
        setItinDetail(Itineraries.activities[index].places)
        setLoading(false);

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
                networkActivityIndicatorVisible={true}
            />
            <View>
                <View>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1495954380655-01609180eda3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }}
                        style={styles.headerImg}
                    />
                    <View style={styles.header}>
                        {
                            (Itineraries.name.length <= 20)
                                ? (<Text style={styles.titleCol} >
                                    {Itineraries.name}
                                </Text>)
                                : (
                                    <Text style={{
                                        fontFamily: 'Poppins-Medium',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        letterSpacing: 0.15,
                                        marginHorizontal: 10
                                    }} >
                                        {Itineraries.name}
                                    </Text>
                                )
                        }
                        <Text style={{ ...styles.total, textTransform: "uppercase", letterSpacing: 3 }}> {Itineraries.location.name}</Text>
                        {
                            Itineraries.date.total_days > 1
                                ? <Text style={{ ...styles.total, marginTop: 0 }}> {Itineraries.date.total_days} days</Text>
                                : <Text style={{ ...styles.total, marginTop: 0 }}> {Itineraries.date.total_days} day</Text>
                        }
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{ backgroundColor: "transparent", marginBottom: 20 }}>
                        <FlatList
                            style={{ backgroundColor: "transparent" }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={Itineraries.activities}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => changedDay(index)} >
                                    <Text style={styles.day}> day {index + 1} </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    {
                        isLoading
                            ? (
                                <ActivityIndicator size="large" color="#000" style={{ height: '100%' }} />
                            )
                            : (
                                <Timeline
                                    data={itinDetail}
                                    circleSize={9}
                                    circleColor='#f8d05d'
                                    lineColor='#53524b'
                                    timeContainerStyle={{
                                        minWidth: 10,
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: "center",
                                    }}
                                    timeStyle={{
                                        textAlign: 'center',
                                        backgroundColor: '#4abebd',
                                        color: 'white',
                                        paddingHorizontal: 5,
                                        paddingVertical: 6,
                                        borderRadius: 50,
                                        fontSize: 8,
                                        fontWeight: 'bold',
                                        width: 50 / 2,
                                        height: 50 / 2
                                    }}
                                    descriptionStyle={{ color: 'gray', fontSize: 9 }}
                                    options={{
                                        style: { paddingTop: 0, marginTop: 0, marginBottom: 160, paddingBottom: 30 }
                                    }}
                                    detailContainerStyle={{
                                        marginBottom: 20,
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        borderRadius: 10,
                                    }}
                                    columnFormat="two-column"
                                />
                            )
                    }

                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: 'white'
    },
    content: {
        width: '100%',
        height: height,
        // borderTopLeftRadius: 50,
        // borderTopRightRadius: 50,
        backgroundColor: 'white',
        // top: -80,
        shadowColor: 'black',
        shadowOpacity: 5,
        shadowOffset: { width: 50, height: 50 },
        padding: 20,
        // paddingHorizontal: 40,
        paddingBottom: 0
    },
    day: {
        marginHorizontal: 8,
        fontSize: 10,
        textAlign: "center",
        fontFamily: 'Quicksand-Medium',
        fontWeight: 'bold',
        color: '#3a3d3d',
        textTransform: "uppercase",
        backgroundColor: '#b3d7d8',
        borderRadius: 12,
        padding: 5
    },
    title: {
        padding: 4,
        marginTop: 5,
        paddingLeft: 8,
        color: 'black',
        letterSpacing: 3,
        marginHorizontal: 5,
        fontWeight: '600',
        fontSize: 12,
        fontFamily: 'Quicksand-Medium'
    },
    navbutton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: 'black',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginHorizontal: 10,
        opacity: 0.6,
    },
    button: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        // borderColor: '#0080FF',
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 10,
    },
    headerImg: {
        height: 200,
        resizeMode: 'cover',
        position: 'relative',
        borderBottomRightRadius: 65,
        borderBottomLeftRadius: 65
    },
    header: {
        paddingTop: 50,
        resizeMode: 'cover',
        position: 'absolute',
        justifyContent: "center",
        textAlign: "center",
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        borderBottomRightRadius: 65,
        borderBottomLeftRadius: 65
    },
    total: {
        textAlign: "center",
        width: '100%',
        color: 'white',
        fontFamily: 'Poppins-Medium',
        color: 'white',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 2,
    },
    titleCol: {
        textAlign: "center",
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.15,
    },
});
