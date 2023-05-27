import NpmExplorerService from "../Services/NpmExplorerService";
import axios from "axios";

describe('NpmExplorerService', () => {
  let service: NpmExplorerService;

  beforeEach(() => {
    service = new NpmExplorerService();
    service.getNPMRegistryState = jest.fn().mockResolvedValue("online");
  });

  it('getNPMRegistryState should resolve to a string', async () => {
    const result = await service.getNPMRegistryState();
    expect(typeof result).toBe('string');
  });
});

const mockedData = {
  name: 'axios',
  description: 'Promise based HTTP client for the browser and node.js',
  'dist-tags': {
    latest: '1.3.5',
    next: '1.2.0-alpha.1'
  },
  latest: 'axios 1.3.5',
  homepage: 'https://axios-http.com',
  license: 'MIT'
};

const mockedAxios = {
  get: jest.fn().mockResolvedValue({ data: mockedData })
};

