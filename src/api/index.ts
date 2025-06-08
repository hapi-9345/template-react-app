/*
 Copyright Fedyakov Mikhail  2025
 */

import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import _ from 'lodash'

const BASE_URL = 'http://localhost:8081/'

const client = axios.create({
	baseURL: BASE_URL,
	withCredentials: true
})

const onRequest = (config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem('access_token')

	if (token) {
		_.set(config, 'headers.Authorization', `Bearer ${token}`)

		if (!_.get(config, 'headers.Content-Type', null)) {
			_.set(config, 'headers.Content-Type', 'application/json;charset=utf-8')
			_.set(config, 'headers.Accept', 'application/json')
		}
	}

	return config
}

const onResponseSuccess = (response: AxiosResponse) => response
const onResponseError = (error: any) => Promise.reject(error)

client.interceptors.request.use(onRequest)
client.interceptors.response.use(onResponseSuccess, onResponseError)

export default client
