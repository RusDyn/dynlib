export default function ClientError({ error }: {
    error: Error & {
        digest?: string;
    };
}): import("react").JSX.Element;
