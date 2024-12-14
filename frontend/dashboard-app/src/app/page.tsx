// import { Inverters } from './components/inverters/Inverters';
import styles from './page.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getInverters } from './services/getInverters';
import InverterFilter from './components/InverterFilter/InverterFilter';
import { Inverters } from './components/inverters/Inverters';
export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['inverter'],
    queryFn: getInverters,
  });
  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Inverters />
        {/* <InverterFilter /> */}
      </HydrationBoundary>
    </main>
  );
}
