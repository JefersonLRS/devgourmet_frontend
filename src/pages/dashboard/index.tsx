import { canSSRAuth } from "@/utils/canSSRAuth"

export default function dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
      props: {}
    }
})