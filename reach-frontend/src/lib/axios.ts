import axios from 'axios'


// Call backend with cookie

      export default axios.create({
          baseURL: process.env.NEXT_PUBLIC_FRONTEND_API_URL,
          withCredentials: true,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              
            },
            
        })
        
        export const axiosPrivate = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                
    },

})