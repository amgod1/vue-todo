import { REQUEST_STATUSES } from '@/constants/requestStatuses'

export const tryCatchHandler = async (callback, isLoading) => {
  try {
    if (isLoading) {
      isLoading.value = true
    }

    const data = await callback()

    return {
      data,
      status: REQUEST_STATUSES.SUCCESS,
    }
  } catch (error) {
    console.error(error)

    return {
      data: null,
      status: REQUEST_STATUSES.ERROR,
    }
  } finally {
    if (isLoading) {
      isLoading.value = false
    }
  }
}
