import { loadFeature, defineFeature } from "jest-cucumber";
import HistoryRepository from "../../src/repositories/history.repository";
import HistoryEntity from "../../src/entities/history.entity";
import HistoryService from "../../src/services/history.service";
import OtherRepository from "../../src/repositories/other.repository";
import HistoryModel from "../../src/models/history.model";
import SongRepository from "../../src/repositories/song.repository";
import SongService from "../../src/services/song.service";
import UserRepository from "../../src/repositories/user.repository";
import UserService from "../../src/services/user.service";
import UserEntity from "../../src/entities/user.entity";
import SongEntity from "../../src/entities/song.entity";
import UserModel from "../../src/models/user.model";
import StatisticsModel from "../../src/models/statistics.model";
import Injector from "../../src/di/injector";
import { di } from "../../src/di/index";

const feature = loadFeature("tests/features/history-service.feature");

defineFeature(feature, (test) => {
  let mockHistoryRepository: HistoryRepository;
  let mockSongRepository: SongRepository;
  let mockUserRepository: UserRepository;

  let historyService: HistoryService;
  let songService: SongService;
  let userService: UserService;

  let mockStatistics: StatisticsModel;

  let mockUserEntity: UserEntity;
  let mockHistoryEntity: HistoryEntity;
  let mockSongEntity: SongEntity;

  let mockUserModel: UserModel;
  let injector: Injector = di;

  beforeEach(() => {
    injector.registerRepository(HistoryRepository, new HistoryRepository());
    mockHistoryRepository = injector.getRepository(HistoryRepository);

    injector.registerRepository(SongRepository, new SongRepository());
    mockSongRepository = injector.getRepository(SongRepository);

    injector.registerRepository(UserRepository, new UserRepository());
    mockUserRepository = injector.getRepository(UserRepository);

    injector.registerService(
      HistoryService,
      new HistoryService(mockHistoryRepository, mockSongRepository)
    );
    historyService = injector.getService(HistoryService);

    injector.registerService(SongService, new SongService(mockSongRepository));
    songService = injector.getService(SongService);

    injector.registerService(UserService, new UserService(mockUserRepository));
    userService = injector.getService(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Obter histórico de um usuário por id", ({ given, when, then }) => {
    let result: HistoryModel[] = [];
    given(
      /^o método getUserHistory chamado com "(.*)" do HistoryService retorna um histórico com "(.*)" itens com song_id "(.*)", "(.*)" e "(.*)"$/,
      async (user_id, song_count, song_1, song_2, song_3) => {
        let songs = [song_1, song_2, song_3];
        for (let song of songs) {
          const mockHistoryEntity = new HistoryEntity({
            id: "",
            user_id: user_id,
            song_id: song,
          });
          await historyService.createHistory(mockHistoryEntity);
        }
      }
    );

    when(
      /^o método getUserHistory do HistoryService for chamado com o id "(.*)"$/,
      async (user_id) => {
        result = await historyService.getUserHistory(user_id);
      }
    );

    then(
      /^o histórico retornado deve ter "(.*)" itens com song_id "(.*)", "(.*)" e "(.*)"$/,
      (song_count, song_1, song_2, song_3) => {
        expect(result.length).toBe(parseInt(song_count));
        for (let song of result) {
          expect([song_1, song_2, song_3]).toContain(song.song_id);
        }
      }
    );
  });

  test("Add a new song to an user history", ({ given, when, then }) => {
    let result: HistoryModel[] = [];
    given(
      /^the function createHistory was called with the user_id "(.*)" and the song_id "(.*)"$/,
      async (user_id, song_id) => {
        mockHistoryEntity = new HistoryEntity({
          id: "",
          user_id: user_id,
          song_id: song_id,
        });

        jest.spyOn(mockHistoryRepository, "createHistory");

        await historyService.createHistory(mockHistoryEntity);

        expect(mockHistoryRepository.createHistory).toHaveBeenCalledTimes(1);
      }
    );

    when(
      /^the function getUserHistory is called with the user_id "(.*)"$/,
      async (user_id) => {
        jest.spyOn(mockHistoryRepository, "getHistories");

        result = await historyService.getUserHistory(user_id);

        expect(mockHistoryRepository.getHistories).toHaveBeenCalledTimes(1);
      }
    );

    then(
      /^the history returned must have "(.*)" item with song_id "(.*)"$/,
      (num_items, song_id) => {
        expect(result.length).toBe(parseInt(num_items));
        expect(result[0].song_id).toBe(song_id);
      }
    );
  });

  test("Delete an entry from an user history", ({ given, when, and, then }) => {
    given(
      /^the user with id "(.*)" has a history entry with id "(.*)"$/,
      (arg0, arg1) => {}
    );

    when(/^the function deleteHistory is called with id "(.*)"$/, (arg0) => {});

    and(
      /^the function getUserHistory is called with the user_id "(.*)"$/,
      (arg0) => {}
    );

    then(
      /^the history returned must not have the entry with id "(.*)"$/,
      (arg0) => {}
    );
  });

  test("Clear user history", ({ given, when, then }) => {
    given(
      /^the user with id "(.*)" has a history with "(.*)" items$/,
      (arg0, arg1) => {}
    );

    when(
      /^the function deleteUserHistory is called with the user_id "(.*)"$/,
      (arg0) => {}
    );

    then(/^the history returned must have "(.*)" items$/, (arg0) => {});
  });

  test("Get user statistics", ({ given, when, then }) => {
    given(
      /^the user with id "(.*)" has a history with the following items:$/,
      (arg0, table) => {}
    );

    when(
      /^the function getUserStatistics is called with the user_id "(.*)"$/,
      (arg0) => {}
    );

    then("it must return the following statistics:", (table) => {});
  });
});

// Test code for creating a new account with the given user and password
// mockUserEntity = new UserEntity({
//   id: "",
//   name: user,
//   email: "testEmail",
//   password: password,
//   history_tracking: true,
//   listening_to: undefined
// });

// let expected = new UserModel(mockUserEntity as UserModel);

// jest.spyOn(userService, "createUser");

// await userService.createUser(mockUserEntity);

// jest.spyOn(userService, "getUsers");

// let users = await userService.getUsers();

// expect(users).toEqual(expected);
// await console.log(mockUserRepository.getUsers)
