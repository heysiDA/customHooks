import {useState, useEffect, useRef} from 'react';

const useFetch = (url) => {
    // useRef para se esta usando para no hacer una llamada http si el componete deja de existir, se destruye
    const isMounted = useRef(true);
    const [state, setState] = useState({
    data:null,
    loading: true,
    error: null
    });

    useEffect(() =>{
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {
      setState({
          data: null,
          loading: true,
          error: null
      });
      fetch(url)
        .then(resp => resp.json())
        .then(data =>{
            if(isMounted.current){
              setState({
                  data,
                  loading: false,
                  error: null
              })
            }
         })
       },
    [url]);

    return state;
}
export default useFetch;
