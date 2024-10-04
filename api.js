import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBnSIV0Tn9c9QfAek7hsicHFgXJFiVpI-k",
  authDomain: "vanslife-uga.firebaseapp.com",
  projectId: "vanslife-uga",
  storageBucket: "vanslife-uga.appspot.com",
  messagingSenderId: "998548167389",
  appId: "1:998548167389:web:989da850e686ecfcc59934"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

// export async function getVans() {
//     const querySnapshot = await getDocs(vansCollectionRef)
//     const dataArr = querySnapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id,
//     }))
//     console.log(dataArr)
//     return dataArr
// }


export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}