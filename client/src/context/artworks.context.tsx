import React, { useContext, useReducer, useState } from 'react'

import reducer from '../reducers/artworks.reducer'
import { FETCH_ARTWORKS_SUCCESS, FETCH_ARTWORK_SUCCESS } from '../constants/artworks.constant'
import artworksService from '../services/artworks.service'
import { useUIContext } from './UI.context'
import { errorMessage } from '../helper/handleErrorMessage'

const ArtworksStateContext = React.createContext<any | null>({})
const ArtworksDispatchContext = React.createContext<any | null>({})

const initialState = {
  artwork: '',
  artworks: '',
}

type SortType = 'new_date' | 'old_date'

export const ArtworksProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const { toastError } = useUIContext()

  const fetchArtworks = async (
    page: number = 1,
    sort: SortType = 'new_date'
  ) => {
    setIsLoading(true)
    await artworksService
      .fetchArtworks(page, sort)
      .then((artworks) => {
        dispatch({type: FETCH_ARTWORKS_SUCCESS, payload: artworks})
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  const fetchArtwork = async (artworkId: any) => {
    setIsLoading(true)
    await artworksService
      .fetchArtwork(artworkId)
      .then((requestWithArtwork) => {
        dispatch({ type: FETCH_ARTWORK_SUCCESS, payload: requestWithArtwork })
        setIsLoading(false)
      })
      .catch((err) => {
        toastError(errorMessage(err))
        setIsLoading(false)
      })
  }

  return (
    <ArtworksStateContext.Provider value={{ ...state, isLoading }}>
      <ArtworksDispatchContext.Provider value={{ fetchArtwork, fetchArtworks }}>
        {children}
      </ArtworksDispatchContext.Provider>
    </ArtworksStateContext.Provider>
  )
}

export const useArtworksStateContext = () => {
  return useContext(ArtworksStateContext)
}

export const useArtworksDispatchContext = () => {
  return useContext(ArtworksDispatchContext)
}
