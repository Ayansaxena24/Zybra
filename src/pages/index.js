export async function getServerSideProps() {
    return {
      redirect: {
        destination: '/users?page=1&limit=5',
        permanent: false, 
      },
    };
  }
  
  export default function Home() {
    return null;
  }
  