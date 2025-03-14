import Container from '@/components/Container';

const Footer = () => {
    return (
        <footer className="mt-6 mb-8">
            <Container className="flex justify-between gap-4">
                <p className="text-sm">
                    Invoicipedia &copy; {new Date().getFullYear()}
                </p>
                <p className="text-sm">
                    Created by OM with Next.js 15, Xata and Clerk
                </p>
            </Container>
        </footer>
    );
};
export default Footer;
