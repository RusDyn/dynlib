'use client';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/src/components/ui/breadcrumb';
export function DashboardBreadcrumb() {
    var segments = useSelectedLayoutSegments();
    //const category = segments[1];
    //console.log(segments);
    var segment1 = undefined;
    //let segment2: string | undefined = undefined;
    if (segments[0] === 'channels') {
        //segment1 = 'Channels';
        segment1 = (<BreadcrumbLink asChild>
        <Link href="/channels">All channels</Link>
      </BreadcrumbLink>);
        if (segments.length > 1) {
            //segment1 = 'New channel';
            //const channelId = segments[1];
            /*const channelName = await getChannel;
            segment1 = (
              <BreadcrumbLink asChild>
                <Link href={`/channels/${channelId}`}>Channel</Link>
              </BreadcrumbLink>
            );*/
        }
    }
    else if (segments[0] === 'settings') {
        segment1 = <BreadcrumbPage>Settings</BreadcrumbPage>;
    }
    //return <Breadcrumb2 segment1={category} />;
    //return <></>;
    /*
    <BreadcrumbItem>
                <BreadcrumbPage>{segment1}</BreadcrumbPage>
              </BreadcrumbItem>
    */
    return (<Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <Home />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segment1 && (<>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{segment1}</BreadcrumbItem>
          </>)}
        {/**
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="#">Channels</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>All Channels</BreadcrumbPage>
                </BreadcrumbItem>
                */}
      </BreadcrumbList>
    </Breadcrumb>);
}
