import {useState, useEffect} from 'react'
import { BASE_URL } from '../pages/InventoryPage'

function useInventory() {
    const [inventory, setInventory] = useState({tamData: [], shopifyData: []})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const tamRes = await fetch(`${BASE_URL}/tam`)
                const tamData = await tamRes.json();
                const shopifyRes = await fetch(`${BASE_URL}/shopify`)
                const shopifyData = await shopifyRes.json();
                setInventory({tamData, shopifyData})
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        
            
        }
        fetchData()
    }, [])

    return {inventory, loading, error}
}

export default useInventory;