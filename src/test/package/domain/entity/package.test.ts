import {Package} from "../../../../package/domain/entity/package";
import {PackageStatus} from "../../../../package/domain/entity/packageStatus.enum";


describe('Package', () => {
    it('should create a package instance correctly', () => {
        const pkg = new Package(
            '1',
            'client1',
            'payment1',
            'order1',
            'origin',
            'destiny',
            50,
            841.5,
            1051.875,
            PackageStatus.Paid,
            new Date('2023-05-01'),
            new Date('2023-05-02'),
            'details',
            null
        );

        expect(pkg.id).toBe('1');
        expect(pkg.clientId).toBe('client1');
        expect(pkg.paymentId).toBe('payment1');
        expect(pkg.orderId).toBe('order1');
        expect(pkg.origin).toBe('origin');
        expect(pkg.destiny).toBe('destiny');
        expect(pkg.weight).toBe(50);
        expect(pkg.distance).toBe(841.5);
        expect(pkg.cost).toBe(1051.875);
        expect(pkg.status).toBe(PackageStatus.Paid);
        expect(pkg.creationDate).toEqual(new Date('2023-05-01'));
        expect(pkg.deliveryDate).toEqual(new Date('2023-05-02'));
        expect(pkg.details).toBe('details');
        expect(pkg.deletedAt).toBeNull();
    });
});