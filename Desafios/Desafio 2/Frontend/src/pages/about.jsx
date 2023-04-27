import { useEffect } from "react"
import { useSelector } from "react-redux"
export default function About({handleAlert}){
    const isLog = useSelector((login)=>{
        return login
    })
   
    useEffect(()=>{
        isLog.status && handleAlert(true, `Welcome ${isLog.user.name}!!`, 'success', true)
    },[isLog])
    

    return(
        <>
        <section>
            <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        </section>
        <section>
            <h2>Tittle</h2>
            <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illum, nobis quaerat fugit, vero quasi et dolorem sit amet cum quo est rerum consequatur libero, nihil mollitia autem voluptas. Fuga.lore
        </p>
        </section>
        </>
    )
}