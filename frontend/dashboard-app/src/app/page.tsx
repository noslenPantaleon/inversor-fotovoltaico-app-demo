import { Inverters } from './components/inverters/Inverters';
import styles from './page.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getInverters } from './services/getInverters';
export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['inverter'],
    queryFn: getInverters,
  });
  return (
    <div>
      <main>
        <header className={styles.main}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Inverters />
          </HydrationBoundary>
        </header>
      </main>
    </div>
  );
}
